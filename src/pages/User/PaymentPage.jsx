import React from 'react'
import Navbar from "../../components/Navbar/navbar";
import Footer from '../../components/Footer';
import Payment from '../../components/User/Payment/Payment';

function PaymentPage() {
  return (
    <div>
      <Navbar />
      <div className="lg:container mx-auto">
        <Payment />
        <Footer />
      </div>
    </div>
  );
}

export default PaymentPage;