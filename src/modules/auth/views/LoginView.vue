<template>
  <h2 class="text-4xl text-center font-bold">Login</h2>
  <FormKit type="form" submit-label="Log in">
    <FormKit type="email" label="Email" name="email" validation="required|email" />
    <FormKit type="password" label="Password" name="password" validation="required" />
  </FormKit>
</template>
