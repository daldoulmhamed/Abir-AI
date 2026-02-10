// Module TypeScript pur pour l'accès universel (Node/Next.js)
// Extraction des questions et scénarios pour randomisation et usage front
export const PART1_QUESTIONS = [
    {
        id: "KC1",
        type: "single",
        question: "You need a concise meeting summary with decisions and action items. Which prompt is best?",
        options: [
            { id: "A", text: "Summarize this meeting." },
            { id: "B", text: "Summarize the meeting in 6 bullet points. Include: decisions made, action items with owners and deadlines, and open questions. Keep it under 180 words." },
            { id: "C", text: "Write a detailed transcript and include everything that was said." },
            { id: "D", text: "Give me a creative recap of the meeting in a storytelling style." }
        ],
        correctAnswers: ["B"],
        explanation: "The best prompt defines the format, required elements, and length constraints for a useful, actionable summary."
    },
    {
        id: "KC2",
        type: "single",
        question: "You must draft a client email using sensitive customer data. What is the safest first step?",
        options: [
            { id: "A", text: "Paste all raw data so the model has full context." },
            { id: "B", text: "Anonymize or remove sensitive details, and include only what is needed for the draft." },
            { id: "C", text: "Ask the model to store the data for later use." },
            { id: "D", text: "Skip human review because AI is more consistent." }
        ],
        correctAnswers: ["B"],
        explanation: "Responsible use starts with minimizing sensitive data exposure and keeping only necessary context."
    },
    {
        id: "KC3",
        type: "multi",
        question: "Which actions improve the reliability of AI-generated content? (Select all that apply)",
        options: [
            { id: "A", text: "Ask for sources or assumptions and verify them." },
            { id: "B", text: "Accept the output if it sounds confident." },
            { id: "C", text: "Cross-check key facts with trusted references." },
            { id: "D", text: "Run a quick edge-case check or counterexample test." }
        ],
        correctAnswers: ["A", "C", "D"],
        explanation: "Verification, fact-checking, and testing edge cases increase trustworthiness. Confidence alone is not evidence."
    },
    {
        id: "KC4",
        type: "single",
        question: "You notice the model is inventing details. What is the best response?",
        options: [
            { id: "A", text: "Ignore it if the answer looks plausible." },
            { id: "B", text: "Ask the model to be more creative." },
            { id: "C", text: "Request a grounded answer, ask for sources, and verify before using the output." },
            { id: "D", text: "Switch to a longer prompt without changing the task." }
        ],
        correctAnswers: ["C"],
        explanation: "When hallucinations appear, you should constrain the output, request sources, and verify against trusted data."
    },
    {
        id: "KC5",
        type: "single",
        question: "Why add a short example to a prompt?",
        options: [
            { id: "A", text: "It reduces the model’s ability to generalize." },
            { id: "B", text: "It demonstrates the expected format, tone, and level of detail." },
            { id: "C", text: "It makes the model always produce longer outputs." },
            { id: "D", text: "It guarantees 100% factual accuracy." }
        ],
        correctAnswers: ["B"],
        explanation: "Examples help the model align with the desired output style and structure."
    },
    {
        id: "KC6",
        type: "single",
        question: "You need a report in a formal tone with bullet points and a 200-word limit. What should you include?",
        options: [
            { id: "A", text: "Only the topic; tone and length are implied." },
            { id: "B", text: "Explicit instructions for tone, format, and word limit." },
            { id: "C", text: "A long paragraph and no formatting guidance." },
            { id: "D", text: "A request to make it fun and casual." }
        ],
        correctAnswers: ["B"],
        explanation: "Clear constraints on tone, format, and length improve consistency and usefulness."
    },
    {
        id: "KC7",
        type: "single",
        question: "Which use of generative AI is most appropriate without additional approvals?",
        options: [
            { id: "A", text: "Drafting a confidential legal contract." },
            { id: "B", text: "Summarizing a public blog post for internal notes." },
            { id: "C", text: "Generating medical advice for a patient." },
            { id: "D", text: "Writing performance reviews using sensitive HR data." }
        ],
        correctAnswers: ["B"],
        explanation: "Low-risk, public content tasks are generally appropriate without extra approvals."
    },
    {
        id: "KC8",
        type: "multi",
        question: "Which prompt elements help reduce ambiguous outputs? (Select all that apply)",
        options: [
            { id: "A", text: "Define the audience and purpose." },
            { id: "B", text: "Leave format unspecified." },
            { id: "C", text: "Provide required sections or headings." },
            { id: "D", text: "Set constraints (length, tone, do/don’t)." }
        ],
        correctAnswers: ["A", "C", "D"],
        explanation: "Specific audience, structure, and constraints reduce ambiguity and improve relevance."
    },
    {
        id: "KC9",
        type: "single",
        question: "What is the best reason to keep a prompt library for recurring tasks?",
        options: [
            { id: "A", text: "It prevents any need for human review." },
            { id: "B", text: "It increases consistency and reduces setup time." },
            { id: "C", text: "It forces all tasks to use the same output." },
            { id: "D", text: "It guarantees zero errors." }
        ],
        correctAnswers: ["B"],
        explanation: "Reusable prompts help standardize quality and speed up repeatable workflows."
    },
    {
        id: "KC10",
        type: "single",
        question: "You used AI to draft a report that will be shared externally. What is a good practice?",
        options: [
            { id: "A", text: "Publish immediately to save time." },
            { id: "B", text: "Disclose AI assistance if required, review for accuracy, and check for sensitive data." },
            { id: "C", text: "Remove all citations so the report looks original." },
            { id: "D", text: "Ask the model to add fictional sources." }
        ],
        correctAnswers: ["B"],
        explanation: "External communications should be reviewed, validated, and compliant with disclosure and privacy policies."
    }
];
export const PART2_SCENARIOS = [
    {
        id: "SC1",
        scenario: "You are preparing a product launch email. You have a draft outline, a list of customer benefits, and a set of compliance-approved claims.",
        actions: [
            { id: "A", text: "Ask the AI to write a launch email and explicitly paste the approved claims and tone guidelines." },
            { id: "B", text: "Ask the AI to invent compelling claims to make the launch more exciting." },
            { id: "C", text: "Let the AI decide the product facts without providing references." }
        ],
        correctAnswer: "A",
        explanation: "Providing approved claims and tone guidance ensures the output stays accurate and compliant."
    },
    {
        id: "SC2",
        scenario: "A manager wants a summary of a 20-page policy document for new hires. The summary must be accurate and easy to follow.",
        actions: [
            { id: "A", text: "Ask AI to summarize without giving the source document, then publish it as-is." },
            { id: "B", text: "Provide the policy, request a bullet summary with sections, and review key points against the original." },
            { id: "C", text: "Ask AI to write a shorter, more creative version with no references." }
        ],
        correctAnswer: "B",
        explanation: "Grounding the model in the source and verifying key points preserves accuracy and clarity."
    },
    {
        id: "SC3",
        scenario: "A student is overwhelmed by a long reading list and wants a study plan for the next 4 weeks.",
        actions: [
            { id: "A", text: "Ask AI to generate a week-by-week plan based on priorities, time available, and upcoming deadlines." },
            { id: "B", text: "Ask AI to read every book and provide a single summary." },
            { id: "C", text: "Use AI to decide which topics are unimportant without checking the course requirements." }
        ],
        correctAnswer: "A",
        explanation: "A plan based on constraints and priorities is the most practical, realistic use of AI."
    },
    {
        id: "SC4",
        scenario: "You handle support tickets. You want AI to draft replies while keeping a consistent, empathetic tone.",
        actions: [
            { id: "A", text: "Create a template prompt with tone guidelines and require human review before sending." },
            { id: "B", text: "Let AI auto-send responses to save time." },
            { id: "C", text: "Ask AI to make responses as short as possible, regardless of customer context." },
            { id: "D", text: "Avoid providing ticket details to keep privacy, and ask AI to guess the issue." }
        ],
        correctAnswer: "A",
        explanation: "Templates plus human review balance efficiency, tone consistency, and accuracy."
    }
];
