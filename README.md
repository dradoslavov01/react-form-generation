# Dynamic Form Generator

A React-based dynamic form generator powered by Material-UI (MUI) that renders forms from JSON schema definitions. Supports conditional visibility, nested groups, and auto-filled fields using mocked external API calls.

---

## Features

- **Dynamic form rendering** from JSON schema.
- Supports multiple field types: Text, Textarea, Dropdown, Checkbox, Radio Button.
- **Conditional visibility** of fields and groups based on other field values.
- **Nested field groups** for organized form sections.
- **Auto-fill support** using external API inputs (mocked for demo).
- Live JSON schema input for easy form customization.
- Validation support for required fields.

---

## Installation

```bash
npm install
```

## Running the project

```bash
npm start
```

## form JSON structure examples

```json
{
  "fields": [
    {
      "type": "Dropdown",
      "label": "Account Type",
      "name": "accountType",
      "options": ["INDIVIDUAL", "BUSINESS"],
      "required": true
    },
    {
      "type": "Text",
      "label": "Full Name",
      "name": "fullName",
      "required": true
    },
    {
      "type": "Text",
      "label": "Company Name",
      "name": "companyName",
      "visibleIf": {
        "accountType": "BUSINESS"
      },
      "required": true
    },
    {
      "type": "Dropdown",
      "label": "Identification Type",
      "name": "idType",
      "options": ["PERSONAL ID", "PASSPORT"]
    },
    {
      "type": "Text",
      "label": "Identification Number",
      "name": "idNumber",
      "required": true,
      "dependencies": ["idType"]
    },
    {
      "type": "Text",
      "label": "Country",
      "name": "country"
    },
    {
      "type": "Text",
      "label": "Phone Prefix (Auto-filled)",
      "name": "phonePrefix",
      "autofillAPI": {
        "endpoint": "/api/prefix",
        "inputs": ["country"]
      }
    }
  ]
}
```


```json
{
  "fields": [
    {
      "type": "Dropdown",
      "label": "User Type",
      "name": "userType",
      "options": ["Student", "Professional"],
      "required": true
    },
    {
      "type": "Group",
      "label": "Student Details",
      "name": "studentDetails",
      "visibleIf": {
        "userType": "Student"
      },
      "fields": [
        {
          "type": "Text",
          "label": "University Name",
          "name": "universityName",
          "required": true
        },
        {
          "type": "Text",
          "label": "Student ID",
          "name": "studentId",
          "required": true
        }
      ]
    },
    {
      "type": "Group",
      "label": "Professional Details",
      "name": "professionalDetails",
      "visibleIf": {
        "userType": "Professional"
      },
      "fields": [
        {
          "type": "Text",
          "label": "Company Name",
          "name": "companyName",
          "required": true
        },
        {
          "type": "Text",
          "label": "Job Title",
          "name": "jobTitle"
        },
        {
          "type": "Text",
          "label": "Work Phone Prefix (Auto-filled)",
          "name": "workPhonePrefix",
          "autofillAPI": {
            "endpoint": "/api/phonePrefix",
            "inputs": ["companyName"]
          }
        }
      ]
    },
    {
      "type": "Checkbox",
      "label": "Subscribe to Newsletter",
      "name": "subscribe"
    }
  ]
}
```
