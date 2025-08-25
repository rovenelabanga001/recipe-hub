<script setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";

// ----------------------
// Form state
// ----------------------
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// ----------------------
// Custom validators
// ----------------------
const oneWord = helpers.withMessage(
  "Must be one word (underscores allowed)",
  helpers.regex("oneWord", /^[A-Za-z0-9_]+$/)
);

const strongPassword = helpers.withMessage(
  "At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
  helpers.regex(
    "strongPassword",
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
  )
);

// ----------------------
// Validation rules
// ----------------------
const rules = {
  username: { required, oneWord },
  email: { required, email },
  password: { required, strongPassword },
  confirmPassword: { required, sameAsPassword: sameAs(() => form.password) },
};

// ----------------------
// Init Vuelidate
// ----------------------
const v$ = useVuelidate(rules, form);

// ----------------------
// Form submit
// ----------------------
const submitForm = async () => {
  const isValid = await v$.$validate();
  if (!isValid) return;

  alert("Form is valid! Submitting...");
  // Submit logic here
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col shadow-2xl rounded-2xl p-7 bg-white/30 gap-5 text-sm md:min-w-[70%] lg:min-w-[40%]"
  >
    <div>
      <h3 class="text-2xl">Get started</h3>
      <p class="text-sm">Enter Your Credentials To Create Your Account</p>
    </div>

    <!-- Username -->
    <div class="flex flex-col">
      <label>Username</label>
      <input
        v-model="form.username"
        type="text"
        placeholder="eg john_doe"
        @blur="v$.username.$touch()"
        class="h-10 px-2 w-full rounded bg-white"
        :class="
          v$.username.$dirty
            ? v$.username.$error
              ? 'border border-red-500'
              : 'border border-green-500'
            : 'border border-gray-300'
        "
      />
      <p
        v-if="v$.username.$error && v$.username.$dirty"
        class="text-red-500 text-xs"
      >
        <span
          v-if="v$.username.$errors.find((e) => e.$validator === 'required')"
        >
          Username is required.
        </span>
        <span
          v-else-if="
            v$.username.$errors.find((e) => e.$validator === 'oneWord')
          "
        >
          Must be one word (underscores allowed).
        </span>
      </p>
    </div>

    <!-- Email -->
    <div class="flex flex-col">
      <label>Email</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="eg john_doe@example.com"
        @blur="v$.email.$touch()"
        class="h-10 px-2 w-full rounded bg-white"
        :class="
          v$.email.$dirty
            ? v$.email.$error
              ? 'border border-red-500'
              : 'border border-green-500'
            : 'border border-gray-300'
        "
      />
      <p v-if="v$.email.$error && v$.email.$dirty" class="text-red-500 text-xs">
        <span v-if="v$.email.$errors.find((e) => e.$validator === 'required')">
          Email is required.
        </span>
        <span
          v-else-if="v$.email.$errors.find((e) => e.$validator === 'email')"
        >
          Enter a valid email.
        </span>
      </p>
    </div>

    <!-- Password -->
    <div class="flex flex-col">
      <label>Password</label>
      <input
        v-model="form.password"
        type="password"
        placeholder="eg MyP@ssw0rd"
        @blur="v$.password.$touch()"
        class="h-10 px-2 w-full rounded bg-white"
        :class="
          v$.password.$dirty
            ? v$.password.$error
              ? 'border border-red-500'
              : 'border border-green-500'
            : 'border border-gray-300'
        "
      />
      <p
        v-if="v$.password.$error && v$.password.$dirty"
        class="text-red-500 text-xs"
      >
        <span
          v-if="v$.password.$errors.find((e) => e.$validator === 'required')"
        >
          Password is required.
        </span>
        <span
          v-else-if="
            v$.password.$errors.find((e) => e.$validator === 'strongPassword')
          "
        >
          At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.
        </span>
      </p>
    </div>

    <!-- Confirm Password -->
    <div class="flex flex-col mb-5">
      <label>Confirm Password</label>
      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder="eg MyP@ssw0rd"
        @blur="v$.confirmPassword.$touch()"
        class="h-10 px-2 w-full rounded bg-white"
        :class="
          v$.confirmPassword.$dirty
            ? v$.confirmPassword.$error
              ? 'border border-red-500'
              : 'border border-green-500'
            : 'border border-gray-300'
        "
      />
      <p
        v-if="v$.confirmPassword.$error && v$.confirmPassword.$dirty"
        class="text-red-500 text-xs"
      >
        <span
          v-if="
            v$.confirmPassword.$errors.find((e) => e.$validator === 'required')
          "
        >
          Confirm Password is required.
        </span>
        <span
          v-else-if="
            v$.confirmPassword.$errors.find(
              (e) => e.$validator === 'sameAsPassword'
            )
          "
        >
          Passwords must match.
        </span>
      </p>
    </div>

    <button
      type="submit"
      class="bg-[orangered] w-full text-white rounded h-10 cursor-pointer"
    >
      Create Account
    </button>

    <p class="text-center">
      Already have an Account?
      <span class="text-[#AE4700] cursor-pointer"
        ><NuxtLink>Log in</NuxtLink></span
      >
    </p>
  </form>
</template>
