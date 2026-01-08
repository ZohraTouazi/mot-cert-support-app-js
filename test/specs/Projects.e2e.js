it('should show projects after login', async () => {
  // hard reset auth state
  await browser.url('http://localhost:3000/')
  await browser.execute(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  await browser.deleteCookies()

  // go where login is known to appear in your app
  await browser.url('http://localhost:3000/#/projects')

  const email = await $('input[name="email"]')
  await email.waitForExist({ timeout: 10000 })
  await email.setValue('admin@test.com')

  await $('input[name="password"]').setValue('password123')
  await $('button').click()

  const title = await $('.card-title')
  await title.waitForExist({ timeout: 10000 })
  await expect(title).toHaveText('Projects')
})
