import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { ElectionFormInputs } from '@/app/page';
export async function POST(request: Request) {
    try {
        const clonedRequest = request.clone();
        const body = (await clonedRequest.json()) as ElectionFormInputs & { signature: string };

        // Load the PDF from the local filesystem
        const pdfPath = path.join(process.cwd(), 'public', 'Enrolment-Form-NIGC-2023.pdf');
        const pdfBytes = fs.readFileSync(pdfPath);

        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Acquire form from loaded PDF
        const form = pdfDoc.getForm();

        const votingMethod = form.getRadioGroup('Voting Method');
        const vmOptions = votingMethod.getOptions();
        votingMethod.select(body.voting_method === 'in_person' ? vmOptions[0] : vmOptions[1]);

        const title = form.getRadioGroup('Title');
        const titleOptions = title.getOptions();
        switch (body.title) {
            case 'Mr':
                title.select(titleOptions[0]);
                break;
            case 'Mrs':
                title.select(titleOptions[1]);
                break;
            case 'Miss':
                title.select(titleOptions[2]);
                break;
            case 'Ms':
                title.select(titleOptions[3]);
                break;
            case 'Dr':
                title.select(titleOptions[4]);
                break;
            case 'Other':
                if (body.title_other) {
                    const title_other = form.getTextField('Other');
                    title_other.setText(body.title_other);
                }
                break;
        }

        const givenName = form.getTextField('Given names');
        givenName.setText(body.current_given_name);
        const familyName = form.getTextField('Family name');
        familyName.setText(body.current_family_name);
        const prevGivenName = form.getTextField('Previous Given Names');
        prevGivenName.setText(body.previous_given_name);
        const prevFamilyName = form.getTextField('Previous family name');
        prevFamilyName.setText(body.previous_family_name);

        const dobDay = form.getTextField('DOB Day');
        dobDay.setText(body.dob_day);
        const dobMonth = form.getTextField('DOB Month');
        dobMonth.setText(body.dob_month);
        const dobYear = form.getTextField('DOB Year');
        dobYear.setText(body.dob_year);

        const addressLine1 = form.getTextField('Address Line 1');
        addressLine1.setText(body.current_address_1);
        const addressLine2 = form.getTextField('Address Line 2');
        addressLine2.setText(body.current_address_2);
        const addressState = form.getTextField('State');
        addressState.setText(body.current_state);
        const addressPostcode = form.getTextField('Postcode');
        addressPostcode.setText((body.current_postcode || '').toString());

        const postalAddressLine1 = form.getTextField('Postal Address Line 1');
        postalAddressLine1.setText(body.current_postal_address_1);
        const postalAddressLine2 = form.getTextField('Postal Address Line 2');
        postalAddressLine2.setText(body.current_postal_address_2);
        const postalAddressState = form.getTextField('Postal Address State');
        postalAddressState.setText(body.current_postal_address_state);
        const postalAddressPostcode = form.getTextField('Postal Address Postcode');
        postalAddressPostcode.setText((body.current_postal_address_postcode || '').toString());

        const mobile = form.getTextField('Mobile');
        mobile.setText(body.mobile);
        const daytime = form.getTextField('Daytime');
        daytime.setText(body.daytime);
        const email = form.getTextField('Email_es_:email');
        email.setText(body.email);

        const evidence = form.getRadioGroup('ID Type');
        const evidenceOptions = evidence.getOptions();
        switch (body.evidence) {
            case 'photo_id':
                evidence.select(evidenceOptions[0]);
                break;
            case 'utility_notice':
                evidence.select(evidenceOptions[1]);
                break;
            case 'stat_dec':
                evidence.select(evidenceOptions[2]);
                break;
        }

        const signatureImage = Buffer.from(body.signature.split(',')[1], 'base64');
        const signatureImageEmbed = await pdfDoc.embedPng(signatureImage);
        const { width, height } = signatureImageEmbed.scale(0.5); // scale as needed
        const page = pdfDoc.getPage(1);
        // Position the signature on the page (adjust x, y coordinates as needed)
        page.drawImage(signatureImageEmbed, {
            x: 400,
            y: 70,
            width,
            height,
        });

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(
            currentDate.getMonth() + 1,
        ).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const date = form.getTextField('Date_es_:date');
        date.setText(formattedDate);

        try {
            const filledPdfBytes = await pdfDoc.save();

            return new Response(filledPdfBytes, {
                status: 200,
                headers: {
                    'Content-Type': `application/pdf`,
                    'Content-Disposition': 'attachment; filename="Enrolment-Form-NIGC-2023.pdf',
                },
            });
        } catch (e) {
            throw e;
        }
    } catch (e) {
        console.log(e);
        return new Response(
            JSON.stringify({
                error: e && typeof e === 'object' && 'message' in e ? JSON.stringify(e.message) : 'Unknown error',
            }),
            {
                status: 500,
            },
        );
    }
}
