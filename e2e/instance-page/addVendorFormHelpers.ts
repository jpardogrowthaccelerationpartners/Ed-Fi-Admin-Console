// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Page } from '@playwright/test'

interface FillAddPartnerFormParams {
    page: Page
    vendorName?: string
    company?: string
    contactEmail?: string
    nameSpacePrefixes?: string[] | null
}

const fillAddVendorPartnerForm = async ({ page, vendorName, company, contactEmail, nameSpacePrefixes }: FillAddPartnerFormParams) => {
  if (vendorName) {
    await page.getByLabel('Vendor Name').fill(vendorName)
  }

  if(company) {
    await page.getByLabel('Company',  { exact: true }).fill(company)
  }

  if(contactEmail) {
    await page.locator('#contactEmailAddress').fill(contactEmail)
  }

  if (nameSpacePrefixes && nameSpacePrefixes.length > 0) {
    for (const prefix of nameSpacePrefixes) {
      await page.getByLabel('Add Namespace Prefixes').type(prefix, { delay: 100 });
      await page.locator('section[role="dialog"]').getByText(prefix, { exact: true }).first().click()
    }
  }
}

export {
  fillAddVendorPartnerForm
}
