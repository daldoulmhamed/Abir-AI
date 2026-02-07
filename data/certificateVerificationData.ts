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
	
  {
        status: "Valid",
        fullName: "dal mod",
        certificationTitle: "1",
        issueDate: "2026-02-07",
        certificateSerial: "ABIR-1-2026-000011",
        verificationUrl: "/verify?serial=ABIR-1-2026-000011",
        qrCodeDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAASxSURBVO3BSY4jSRAEQdMA//9lnT76KYBEOquXMRH8JVVLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkWfvATkJ6mZgExqJiCTmgnIG2omIG+omYD8JDVvnFQtOqladFK16JNlajYBuVFzo+ZGzRNAbtTcAHlDzSYgm06qFp1ULTqpWvTJlwF5Qs0TQCY1bwCZ1ExqboDcqJmAvAHkCTXfdFK16KRq0UnVok/+cmpugExqJiCTmhsgT6iZgPzLTqoWnVQtOqla9El9FZD/k5OqRSdVi06qFn3yZWq+CcgbaiYgN2omIDdqJiCb1PxJTqoWnVQtOqla9MkyIL+TmgnIDZBJzQTkCTUTkEnNBOQJIH+yk6pFJ1WLTqoW4S/5hwF5Q80mIJOaf8lJ1aKTqkUnVYs+eQnIpGYCMql5AsiNmhs1N0CeAHKj5kbNG0AmNTdAJjUTkEnNGydVi06qFp1ULcJf8kVA3lAzAblRMwGZ1ExAJjVPALlRcwNkUjMBuVHzBJAbNW+cVC06qVp0UrXok5eAPKFmAjKpmYDcqJmATGpu1ExAbtTcqHkDyI2aCciNmknNBGTTSdWik6pFJ1WLPlmm5gbIpGYCMql5Qs0EZFJzo2YCMgH5SWo2AZnUbDqpWnRSteikatEny4BMat4AMql5Qs0E5A01N0Bu1ExqboDcqJmA3KiZgExq3jipWnRSteikatEny9TcqLlR8waQGzU3QN5QcwNkUrNJzQRkUvNNJ1WLTqoWnVQt+mQZkCfUTEA2qXlCzQ2QSc0E5EbNBGRSM6mZgPzJTqoWnVQtOqlahL/kBwGZ1LwB5Ak1E5AbNX8TIJOaGyCTmjdOqhadVC06qVr0yZcBmdTcALlR8zsBeUPNBOQJNX+yk6pFJ1WLTqoWfbIMyBNAbtRMQCY1E5AbIDdqbtRMQCY1N0DeADKpeQLIN51ULTqpWnRSteiTl4A8AeQJIE+oeQPIjZobIE+oeQPIE2omIJtOqhadVC06qVr0yUtqngDyhJobIJOaN9RMQCYgN2qeAHKjZgIyqZmA3AD5ppOqRSdVi06qFuEveQHIE2omIE+ouQHyhJoJyI2aGyA3aiYgm9T8TidVi06qFp1ULfrkJTVvqHkDyKTmCSCb1Lyh5gkgN0AmNROQSc0bJ1WLTqoWnVQt+uQlID9JzQ2QSc0E5EbNDZBJzQRkE5BJzRtAvumkatFJ1aKTqkWfLFOzCciNmifU3ACZ1ExqbtTcAHlCzRtqJiDfdFK16KRq0UnVok++DMgTat4AMqnZBORGzQRkUjMBmYB8k5pvOqladFK16KRq0Sf/c0CeUDMBmYBMaiYgk5o3gExAbtR800nVopOqRSdViz75ywG5AXKjZpOaJ4DcqHlCzQ2QGzVvnFQtOqladFK16JMvU/NNaiYgk5ongExqJiCb1DwB5AbIpGZS800nVYtOqhadVC36ZBmQnwTkCSA3am7UTEAmIG8AeUPNE0AmNW+cVC06qVp0UrUIf0nVkpOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRfzWuFEw6XzGEAAAAAElFTkSuQmCC",
      }
];

	// Fonction pour générer l'URL de vérification
	export function buildVerificationUrl(serial: string): string {
		return `/verify?serial=${encodeURIComponent(serial)}`;
	}
	// Exemple d'utilisation :
	// buildVerificationUrl("ABIR-GAI-2026-000127") => "/verify?serial=ABIR-GAI-2026-000127"
