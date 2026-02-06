// Sample certificate data for verification (MVP)
// Replace this with a database connection in production
export type Certificate = {
	status: string;
	fullName: string;
	certificationTitle: string;
	issueDate: string;
	certificateSerial: string;
	verificationUrl: string;
	/**
	 * QR code encodé en base64 (DataURL) pour vérification rapide.
	 * Généré UNE SEULE FOIS à l'émission du certificat.
	 */
	qrCodeDataUrl?: string;
};

export const certificates: Certificate[] = [
	// Exemple de certificat pour le typage (à remplacer par vos données réelles)
	{
		status: "Valid",
		fullName: "John Doe",
		certificationTitle: "AI Fundamentals",
		issueDate: "2024-01-01",
		certificateSerial: "ABC123456",
		verificationUrl: buildVerificationUrl("ABC123456"),
		qrCodeDataUrl: undefined, // À remplir lors de l'émission réelle
	},
	];

	// Fonction pour générer l'URL de vérification
	export function buildVerificationUrl(serial: string): string {
		return `/verify?serial=${encodeURIComponent(serial)}`;
	}
	// Exemple d'utilisation :
	// buildVerificationUrl("ABIR-GAI-2026-000127") => "/verify?serial=ABIR-GAI-2026-000127"
