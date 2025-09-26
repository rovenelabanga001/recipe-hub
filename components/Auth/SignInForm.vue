<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

const router = useRouter();
const authStore = useAuthStore();
const { login } = useAuth();

const credentials = reactive({
  email: authStore.signUpData?.email || "",
  password: "",
});

const loading = ref(false);

const rules = {
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Enter a valid email", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

const v$ = useVuelidate(rules, credentials);

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    loading.value = true;
    const data = await login(credentials.email, credentials.password);

    if (data.error || !data.success) {
      const errorMessage = data.error || data.message; //"Invalid Email or Password";
      useToastify(errorMessage, { type: "error" });
      return;
    }

    authStore.setUser(data.user);
    authStore.token = data.token;
    authStore.clearSignUpData();

    navigateTo("/", { replace: true });
    useToastify("Login Successful", { type: "success" });
  } catch (err) {
    useToastify("Failed, try again later", { type: "error" });
    console.log(err);
  } finally {
    loading.value = false;
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
    <div class="flex flex-col">
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
    <div class="flex flex-col">
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
      class="bg-[orangered] w-full text-white rounded h-10 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
      :disabled="loading"
    >
      <svg
        v-if="loading"
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>{{ loading ? "Signing In..." : "Sign In" }}</span>
    </button>

    <p class="text-center">
      Don't have an account yet?
      <span class="text-[orangered] cursor-pointer">
        <NuxtLink to="/auth/signup">Register</NuxtLink>
      </span>
    </p>
  </form>
</template>
