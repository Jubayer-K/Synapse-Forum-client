import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = 9;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    status: 'completed'
                };

                const res = await axiosSecure.post('/payments', payment);

                if (res.data?.paymentResult?.insertedId) {
                    toast.success("Thank you for Your Transaction")
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Congratulations! You're a GOLD Member",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/membership');
                }
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Gold Membership</h2>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border border-gray-300 rounded mb-4"
                />
                <button className="btn btn-sm btn-primary my-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {error && <p className="text-red-600 text-center">{error}</p>}
                {transactionId && <p className="text-green-600 text-center">Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
