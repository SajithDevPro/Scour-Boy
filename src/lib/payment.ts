export async function startPayHerePayment(
  plan: "free" | "pro" | "elite",
  email: string
) {
  const amountMap = {
    free: 0,
    pro: 3,
    elite: 5,
  };

  const amount = amountMap[plan];

  const res = await fetch("http://localhost:3000/api/payhere/create-payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        email,
        amount,
      }),
    }
  );

  const data = await res.json();

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://sandbox.payhere.lk/pay/checkout";

  Object.entries(data.paymentData).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value as string;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}