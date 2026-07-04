import { LoanApplication, ConsultationApplication } from '../types';

/**
 * Searches for an existing Google Spreadsheet named "KML Finance Loan Enquiries".
 * If not found, creates a new spreadsheet and adds a header row.
 * Finally, appends the loan application details as a new row.
 */
export async function saveLoanApplicationToSheets(
  application: LoanApplication,
  accessToken: string
): Promise<{ spreadsheetId: string; webViewLink?: string }> {
  if (!accessToken) {
    throw new Error('Access token is required to save to Google Sheets');
  }

  // 1. Search for the spreadsheet in Google Drive
  const query = encodeURIComponent(
    "name = 'KML Finance Loan Enquiries' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
  );
  
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`;
  const searchResponse = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!searchResponse.ok) {
    const errorBody = await searchResponse.text();
    console.error('Drive search failed:', errorBody);
    throw new Error(`Failed to search for Google Sheet: ${searchResponse.statusText}`);
  }

  const searchData = await searchResponse.json();
  let spreadsheetId = '';
  let webViewLink = '';

  if (searchData.files && searchData.files.length > 0) {
    spreadsheetId = searchData.files[0].id;
    webViewLink = searchData.files[0].webViewLink;
  } else {
    // 2. Spreadsheet not found. Create a new one.
    const createUrl = 'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink';
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'KML Finance Loan Enquiries',
        mimeType: 'application/vnd.google-apps.spreadsheet',
      }),
    });

    if (!createResponse.ok) {
      const errorBody = await createResponse.text();
      console.error('Drive file creation failed:', errorBody);
      throw new Error(`Failed to create a new Google Sheet: ${createResponse.statusText}`);
    }

    const createData = await createResponse.json();
    spreadsheetId = createData.id;
    webViewLink = createData.webViewLink;

    // 3. Initialize new spreadsheet with header row
    const appendHeaderUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G:append?valueInputOption=USER_ENTERED`;
    const headerResponse = await fetch(appendHeaderUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'A:G',
        majorDimension: 'ROWS',
        values: [
          ['Name', 'Age', 'Contact Number', 'Occupation', 'Loan Type', 'Monthly Income (₹)', 'Enquiry Date'],
        ],
      }),
    });

    if (!headerResponse.ok) {
      const errorBody = await headerResponse.text();
      console.error('Writing headers failed:', errorBody);
      // We don't throw here so we can still try to append the data row
    }
  }

  // 4. Append the application details as a new row
  const appendDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:G:append?valueInputOption=USER_ENTERED`;
  const dataRow = [
    application.name,
    application.age,
    application.contactNo,
    application.occupation,
    application.loanType,
    application.income,
    application.enquiredDate,
  ];

  const appendResponse = await fetch(appendDataUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: 'A:G',
      majorDimension: 'ROWS',
      values: [dataRow],
    }),
  });

  if (!appendResponse.ok) {
    const errorBody = await appendResponse.text();
    console.error('Appending application failed:', errorBody);
    throw new Error(`Failed to save application data to Google Sheet: ${appendResponse.statusText}`);
  }

  return { spreadsheetId, webViewLink };
}

/**
 * Searches for an existing Google Spreadsheet named "KML Finance Consultations".
 * If not found, creates a new spreadsheet and adds a header row.
 * Finally, appends the consultation details as a new row.
 */
export async function saveConsultationToSheets(
  consultation: ConsultationApplication,
  accessToken: string
): Promise<{ spreadsheetId: string; webViewLink?: string }> {
  if (!accessToken) {
    throw new Error('Access token is required to save to Google Sheets');
  }

  // 1. Search for the spreadsheet in Google Drive
  const query = encodeURIComponent(
    "name = 'KML Finance Consultations' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
  );
  
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`;
  const searchResponse = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!searchResponse.ok) {
    const errorBody = await searchResponse.text();
    console.error('Drive search failed:', errorBody);
    throw new Error(`Failed to search for Google Sheet: ${searchResponse.statusText}`);
  }

  const searchData = await searchResponse.json();
  let spreadsheetId = '';
  let webViewLink = '';

  if (searchData.files && searchData.files.length > 0) {
    spreadsheetId = searchData.files[0].id;
    webViewLink = searchData.files[0].webViewLink;
  } else {
    // 2. Spreadsheet not found. Create a new one.
    const createUrl = 'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink';
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'KML Finance Consultations',
        mimeType: 'application/vnd.google-apps.spreadsheet',
      }),
    });

    if (!createResponse.ok) {
      const errorBody = await createResponse.text();
      console.error('Drive file creation failed:', errorBody);
      throw new Error(`Failed to create a new Google Sheet: ${createResponse.statusText}`);
    }

    const createData = await createResponse.json();
    spreadsheetId = createData.id;
    webViewLink = createData.webViewLink;

    // 3. Initialize new spreadsheet with header row
    const appendHeaderUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:E:append?valueInputOption=USER_ENTERED`;
    const headerResponse = await fetch(appendHeaderUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'A:E',
        majorDimension: 'ROWS',
        values: [
          ['Name', 'Phone Number', 'Service Required', 'City', 'Enquiry Date'],
        ],
      }),
    });

    if (!headerResponse.ok) {
      const errorBody = await headerResponse.text();
      console.error('Writing headers failed:', errorBody);
    }
  }

  // 4. Append the consultation details as a new row
  const appendDataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:E:append?valueInputOption=USER_ENTERED`;
  const dataRow = [
    consultation.name,
    consultation.phone,
    consultation.service || 'General',
    consultation.city || 'N/A',
    consultation.enquiredDate,
  ];

  const appendResponse = await fetch(appendDataUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: 'A:E',
      majorDimension: 'ROWS',
      values: [dataRow],
    }),
  });

  if (!appendResponse.ok) {
    const errorBody = await appendResponse.text();
    console.error('Appending consultation failed:', errorBody);
    throw new Error(`Failed to save consultation details to Google Sheet: ${appendResponse.statusText}`);
  }

  return { spreadsheetId, webViewLink };
}

