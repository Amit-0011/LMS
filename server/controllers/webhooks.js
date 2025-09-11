// import { Webhook } from "svix";
// import User from "../models/User.js";
// import Stripe from "stripe";
// import { Purchase } from "../models/Purchase.js";
// import Course from "../models/Course.js";

// // API Controller Function to Manage Clerk User with database

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     await whook.verify(JSON.stringify(req.body), {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     })

//     const { data, type } = req.body

//     switch (type) {
//         case 'user.created': {
//             const userData = {
//                 _id: data.id,
//                 email: data.email_addresses[0].email_address,
//                 name: data.first_name + " " + data.last_name,
//                 imageUrl: data.image_url,
//             }

//             await User.create(userData)
//             res.json({})
//             break;
//         }
            
//         case 'user.updated': {
//             const userData = {
//                 email: data.email_addresses[0].email_address,
//                 name: data.first_name + " " + data.last_name,
//                 imageUrl: data.image_url,
//             }
//             await User.findByIdAndUpdate(data.id, userData)
//             res.json({})
//             break;
//         }

//         case 'user.deleted': {
//             await User.findByIdAndDelete(data.id)
//             res.json({})
//             break;
//         }
    
//         default:
//             break;
//     }

//   } catch (error) {
//     res.json({success: false, message: error.message})
//   }
// };

// // Stripe Payment Gateway
// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

// export const stripeWebhooks = async (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   }
//   catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':{
//       const paymentIntent = event.data.object;
//       const paymentIntentId = paymentIntent.id

//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntentId
//       })

//       const { purchaseId } = session.data[0].metadata;

//       const purchaseData = await Purchase.findById(purchaseId)
//       const userData = await User.findById(purchaseData.userId)
//       const courseData = await Course.findById(purchaseData.courseId.toString())

//       courseData.enrolledStudents.push(userData)
//       await courseData.save()

//       userData.enrolledCourses.push(courseData._id)
//       await userData.save()

//       purchaseData.status = 'completed'
//       await purchaseData.save()

//       break;
//     }
//     case 'payment_intent.payment_failed':{
//       const paymentIntent = event.data.object;
//       const paymentIntentId = paymentIntent.id

//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntentId
//       })

//       const { purchaseId } = session.data[0].metadata;

//       const purchaseData = await Purchase.findById(purchaseId)
//       purchaseData.status = 'failed'
//       await purchaseData.save()

//       break;
//     }
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});


// }




// debuged
import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

// Stripe instance
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  console.log('Clerk webhook received');
  
  try {
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error('CLERK_WEBHOOK_SECRET not defined');
      return res.status(500).json({success: false, message: 'Server configuration error'});
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Convert buffer to string for Clerk webhook
    const payload = req.body.toString();
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    let event;
    try {
      event = whook.verify(payload, headers);
    } catch (verifyError) {
      console.error('Clerk webhook verification failed:', verifyError.message);
      return res.status(400).json({success: false, message: 'Webhook verification failed'});
    }

    const { data, type } = event;
    console.log('Clerk event type:', type);

    switch (type) {
        case 'user.created': {
            const userData = {
                _id: data.id,
                email: data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url,
            }

            await User.create(userData);
            console.log('User created:', userData._id);
            break;
        }
            
        case 'user.updated': {
            const userData = {
                email: data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, userData);
            console.log('User updated:', data.id);
            break;
        }

        case 'user.deleted': {
            await User.findByIdAndDelete(data.id);
            console.log('User deleted:', data.id);
            break;
        }
    
        default:
            console.log('Unhandled Clerk event type:', type);
            break;
    }

    return res.json({received: true});

  } catch (error) {
    console.error('Clerk webhook error:', error);
    return res.status(500).json({success: false, message: error.message});
  }
};

// Stripe webhook handler
export const stripeWebhooks = async (request, response) => {
  console.log('Stripe webhook received');
  
  const sig = request.headers['stripe-signature'];
  let event;

  // Verify webhook signature
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not defined');
      return response.status(500).json({error: 'Server configuration error'});
    }

    if (!sig) {
      console.error('No stripe signature header');
      return response.status(400).json({error: 'No signature header'});
    }

    // Use raw body from express.raw() middleware
    event = stripeInstance.webhooks.constructEvent(
      request.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('Stripe webhook verified successfully:', event.type);
  }
  catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return response.status(400).json({
      error: 'Webhook verification failed',
      message: err.message
    });
  }

  // Handle the event with proper error handling
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        console.log('Processing payment_intent.succeeded');
        
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        // Get checkout session
        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId
        });

        if (!sessions.data || sessions.data.length === 0) {
          console.error('No checkout session found for payment intent:', paymentIntentId);
          return response.status(400).json({error: 'Checkout session not found'});
        }

        const session = sessions.data[0];
        const { purchaseId } = session.metadata || {};

        if (!purchaseId) {
          console.error('No purchaseId found in session metadata');
          return response.status(400).json({error: 'Purchase ID not found in metadata'});
        }

        console.log('Processing purchase ID:', purchaseId);

        // Fetch purchase data
        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) {
          console.error('Purchase not found in database:', purchaseId);
          return response.status(400).json({error: 'Purchase record not found'});
        }

        // Fetch user and course data
        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId.toString());

        if (!userData) {
          console.error('User not found:', purchaseData.userId);
          return response.status(400).json({error: 'User not found'});
        }

        if (!courseData) {
          console.error('Course not found:', purchaseData.courseId);
          return response.status(400).json({error: 'Course not found'});
        }

        // Check if user is already enrolled to avoid duplicates
        const isAlreadyEnrolled = courseData.enrolledStudents.some(
          student => student.toString() === userData._id.toString()
        );

        if (!isAlreadyEnrolled) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
          console.log('User added to course enrolled students');
        } else {
          console.log('User already enrolled in course');
        }

        // Check if course is already in user's enrolled courses
        const isCourseInUserList = userData.enrolledCourses.some(
          course => course.toString() === courseData._id.toString()
        );

        if (!isCourseInUserList) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
          console.log('Course added to user enrolled courses');
        } else {
          console.log('Course already in user enrolled list');
        }

        // Update purchase status
        purchaseData.status = 'completed';
        await purchaseData.save();
        
        console.log('Purchase completed successfully:', purchaseId);
        break;
      }

      case 'payment_intent.payment_failed': {
        console.log('Processing payment_intent.payment_failed');
        
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        try {
          const sessions = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId
          });

          if (sessions.data && sessions.data.length > 0) {
            const { purchaseId } = sessions.data[0].metadata || {};
            
            if (purchaseId) {
              const purchaseData = await Purchase.findById(purchaseId);
              if (purchaseData) {
                purchaseData.status = 'failed';
                await purchaseData.save();
                console.log('Purchase marked as failed:', purchaseId);
              }
            }
          }
        } catch (failedPaymentError) {
          console.error('Error processing failed payment:', failedPaymentError);
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    // Always return success response to Stripe
    return response.json({received: true});

  } catch (error) {
    console.error('Error processing stripe webhook:', error);
    console.error('Error stack:', error.stack);
    
    return response.status(500).json({
      error: 'Webhook processing failed',
      message: error.message
    });
  }
};