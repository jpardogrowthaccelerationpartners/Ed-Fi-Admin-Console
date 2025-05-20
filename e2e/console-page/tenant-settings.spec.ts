// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect, Page 
} from '@playwright/test'
import { routes } from '../core/routes'

let page: Page

test.describe('Home Page Tests', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(routes.home)
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle', { timeout: 35000 })
  })

  test('Home page should show Tenant Settings', async () => {
    await expect(page.getByRole('link', { name: 'Tenant Instance Settings' })).toBeVisible()
  })

  test('Should show go to Tenant Setting Page', async () => {
    const tenantInstanceAction = page.locator('a:has-text("Tenant Instance Settings")')
    await page.getByRole('link', { name: 'Tenant Instance Settings' }).click()

    await expect(page.getByRole('tab')).toContainText('Tenant Instance Settings')
    await page.getByText('Tenant Name').click()
    await expect(page.getByRole('group')).toContainText('Tenant Name')
    await expect(page.getByRole('group')).toContainText('Ed-Fi Base URL')
  })

  test('should navigate back to home when clicking "Back to Tech Console Home"', async () => {
  const tenantInstanceLink = page.getByRole('link', { name: 'Tenant Instance Settings' })
  await page.waitForLoadState('networkidle')
  await tenantInstanceLink.waitFor({ state: 'visible', timeout: 10000 })

  await tenantInstanceLink.click()
  await page.waitForLoadState('networkidle')

  const backLink = page.getByRole('link', { name: 'Back to Tech Console Home' })
  await backLink.waitFor({ state: 'visible', timeout: 10000 })

  await backLink.click()
  await expect(page).toHaveURL(routes.home)
})

})
