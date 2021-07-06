import { GoogleSpreadsheet } from "google-spreadsheet";
//Mail sending
import * as emailjs from "emailjs-com";

// Config variables
const SPREADSHEET_ID = "1l7uvg_TMdnOfN__Suamh8jgnbXGhBClKy4ZtIKK1XcA";
const SHEET_ID = "0";
const CLIENT_EMAIL =
  "work-hall@academy-registra-1605173971230.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEHOlVYVGJOeB+\ntTj0W505Wntj4CxLpFxEWgBPhjZLL5y+qmcSbvzotqTm+U7Gsdbwb6VdtfO9lVVI\n1YdBkL8DfWOJfkGoOiyrKJH4Td7xgJ441cLF2dQ7VtxRSAlJjqwJ4+oeOakpxET0\nHhEu0KkrozOX73QOD65ycyQAnxGOMOgh6XQpayfYzh5svBiAfDmLa5+sLMSscgiw\nfGAiAOehRtF7zTpXbOp474NWIZKfkM081gS+/D0znj50XSkKFHmtC9o7bK5YXlfI\ntjy3vt41BQsyHiSoZ8HEp/nVUbHVTUA+yUAmqnNRrHFETZYSrMD67aal2Ivk4LHM\nKzN5TmUJAgMBAAECggEACOPiTFF3qQUeO8LlhKb04Gaikn3qfCOvXsDcDpQquMCn\n4M59ktdvBcdRKpBRhXkxNsqU4EPmkKj+Sf7gsrSdWCA9HNHup4c67ae5QEdFbJoU\nR3F3SCajs+ya2wttMlqySqt8j5IKbLSInK69QCug3kkicQg08Qs9xlNDu0x6twDv\ntSL1eAYRGtGHSHulELh5ZRsNzlsWwCiKTuU8/5XeT9K9vJXNu7J02KA5W46VDWOF\nUTK9GdbukE7g5xiCvi2jHpCWC9ZxqdCzd46/DJ5pwY4slJra1IFfhozmzQl6Lcso\noRF94XV93zJgK3QVwSzfjk2ugxXGnDG3B+wrb4a/NQKBgQDvTJnebjWYWm3ejb24\nImblIkpr0YzB8pvWSTWZDUaRWqUIt04dhC6tRa+b6MEeaI/jFiBBkO1MhG22HXDm\n/gnQJ8kU+ppk14kubSzFkLtoVe9069LfcLn1kp/pP7KoHSTO0OToZWT2vbuqb4Ra\njVP5noJ1VOxZ7pv26Dd7H32+NQKBgQDRzLrc7f7TPUOYyftdEZzFD+nh9zLypC7s\nv655+aWADvK0srMAdhQTyf7l+VztDflK4qr3LuN0cb3ufNDbHAPFkpW79fLouHzf\nLDnxrnlUFOcWWPSC4/LQ63VcbOWc8adXHv5+APYKEKQl+A6wJjoiD1PZgj5noiAe\nH5XD8CC2BQKBgQDLLwFfCbjcGbw8QaGbHSq813bVQWIAs9x6AENQJyOJ+6sxUWM0\nUK3JVegbu29uQF4b9QeCZGn4lGELRsg8eesfIQjtlTNO+Gt0TiK7xX46wuzFHA86\nxV5AEzVQOVOaxtQf/uK+KImnr8YOmw2ITYPF6T7gHTFp0t3+sYGaO0zrGQKBgFHy\n1T6829+pO4EvzDaTTZgP2jyAcW8jwIyLZtyQLhwyOo1oi9DvTnJYYW91Et4pqimd\nFkjNEN2IHDdOm8oqTDLdSg2MSWCrx2LpBI0pqIy2SXmKL5/85/jBMCt1Ac9m+QVn\nvuJ6/5/41hVaqmoV1Hk/YXJBlJyoUEFT9wz8+9n9AoGBAKlkyHx+WACxWOMr97fN\na+Ls03kugkvJb+PUVu0rMsNKB/i3dTPpz1mqqU7LntMShsd0h+ZoGnBwf6sk2agG\nxs02uEnWkRlmvlWBFOFtahH6bJqG3Kh9pzwN16Rzr/qIgd9bfXlETx6D3SGO3SMR\n84+jm0xK/gLtdy+jE9ViDy8O\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);
  } catch (e) {
    console.error("Error: ", e);
  }
};

export const academyEmail = (name, email, course) => {
  // e.preventDefault()

  let templateParams = {
    name: name,
    email: email,
    course: course,
  };
  emailjs.send(
    "service_aact3fn",
    "template_qjtzxte",
    templateParams,
    "user_gGI5qjnMWGaYCd7S5pyW2"
  );
};
