import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
export async function POST(request: Request) {
    try {
        const clonedRequest = request.clone();
        const body = await clonedRequest.json();

        console.log(body);

        // Load the PDF from the local filesystem
        const pdfPath = path.join(process.cwd(), 'public', 'Enrolment-Form-NIGC-2023.pdf');
        const pdfBytes = fs.readFileSync(pdfPath);

        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Acquire form from loaded PDF
        const form = pdfDoc.getForm();

        const fields = form.getFields();

        console.log(fields);

        const filledPdfBytes = await pdfDoc.save();

        return new Response(filledPdfBytes, {
            status: 200,
            headers: {
                'Content-Type': `application/pdf`,
                'Content-Disposition': 'attachment; filename="Enrolment-Form-NIGC-2023.pdf',
            },
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: JSON.stringify(e),
            }),
            {
                status: 500,
            },
        );
    }
}
