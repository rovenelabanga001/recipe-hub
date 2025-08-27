<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const { login } = useAuth();
// ----------------------
// Form state
// ----------------------
const credentials = reactive({
  email: "",
  password: "",
});

// ----------------------
// Validation rules
// ----------------------
const rules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Enter a valid email", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

// ----------------------
// Init Vuelidate
// ----------------------
const v$ = useVuelidate(rules, credentials);

// ----------------------
// Submit handler
// ----------------------
const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const data = await login(credentials.email, credentials.password);

    if (!data.success) {
      useToastify("Invalid Email or Password", { type: "error" });
      console.log("Server response", data);
      return;
    }

    if (process.client && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    useToastify("Login Successful", { type: "success" });
    router.push("/");
  } catch (err) {
    useToastify("Failed, try again later", { type: "error" });
    console.log(err);
  }
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col shadow-2xl rounded-2xl p-7 bg-white/30 gap-5 text-sm md:min-w-[70%] lg:min-w-[40%]"
  >
    <h3 class="text-2xl">Log In</h3>
    <!-- Email -->
    <div class="flex flex-col" v-if="v$">
      <label>Email</label>
      <input
        v-model="credentials.email"
        type="email"
        placeholder="eg john_doe@example.com"
        @blur="v$.email?.$touch()"
        class="bg-white h-10 px-2 w-full rounded"
        :class="
          v$.email?.$dirty
            ? v$.email?.$error
              ? 'border-2 border-red-500'
              : 'border-2 border-green-500'
            : 'border-2 border-gray-300'
        "
      />
      <p
        v-if="v$.email?.$error && v$.email?.$dirty"
        class="text-red-500 text-xs"
      >
        {{ v$.email?.$errors[0].$message }}
      </p>
    </div>

    <!-- Password -->
    <div class="flex flex-col" v-if="v$">
      <label>Password</label>
      <input
        v-model="credentials.password"
        type="password"
        placeholder="eg myP@ssw0rd"
        @blur="v$.password?.$touch()"
        class="bg-white h-10 px-2 w-full rounded"
        :class="
          v$.password?.$dirty
            ? v$.password?.$error
              ? 'border-2 border-red-500'
              : 'border-2 border-green-500'
            : 'border-2 border-gray-300'
        "
      />
      <p
        v-if="v$.password?.$error && v$.password?.$dirty"
        class="text-red-500 text-xs"
      >
        {{ v$.password?.$errors[0]?.$message }}
      </p>
    </div>

    <button
      type="submit"
      class="bg-[orangered] w-full text-white rounded h-10 cursor-pointer"
    >
      Sign In
    </button>

    <p class="text-center">
      Don't have an account yet?
      <span class="text-[orangered] cursor-pointer">
        <NuxtLink to="/auth/signup">Register</NuxtLink>
      </span>
    </p>
  </form>
</template>
