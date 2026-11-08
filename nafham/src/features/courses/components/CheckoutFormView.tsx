"use client";

import CheckoutContainer from './checkout/CheckoutContainer';

interface CheckoutFormViewProps {
  initialCourse: any;
}

export default function CheckoutFormView({ initialCourse }: CheckoutFormViewProps) {
  return <CheckoutContainer initialCourse={initialCourse} />;
}
