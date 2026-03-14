export function examRegistered(
  name: string,
  exam: string
) {
  return `
<h1>Welcome ${name} 🚀</h1>

<p>Your registration for the exam is confirmed.</p>

<b>${exam}</b>

<p>You can now start your certification exam.</p>

<p>We wish you the best of luck.</p>

<p>— Abir-AI Team</p>

`;
}
