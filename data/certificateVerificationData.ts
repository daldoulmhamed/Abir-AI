// Sample certificate data for verification (MVP)
// Replace this with a database connection in production
export type Certificate = {
	status: string;
	fullName: string;
	certificationTitle: string;
	issueDate: string;
	certificateSerial: string;
};

export const certificates: Certificate[] = [
	// Exemple de certificat pour le typage (à remplacer par vos données réelles)
	{
		status: "Valid",
		fullName: "John Doe",
		certificationTitle: "AI Fundamentals",
		issueDate: "2024-01-01",
		certificateSerial: "ABC123456",
	},
];
