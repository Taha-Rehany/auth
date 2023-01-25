<template>
	<div>
		<CoreCard classes="text-center mb-5">
			<template #title>
				<h2>{{ $t("auth.loginTitle") }}</h2>
			</template>
			<template #text>
				<p>{{ $t("auth.loginSubtitle") }}</p>
			</template>
		</CoreCard>
		<CoreForm
			method="post"
			:passed-form-data="LoginFormData"
			:reset-on-submit="false"
			:submit-from-parent="true"
			@submitClicked="login"
		>
			<template #extra-content>
				<v-col cols="12">
					<nuxt-link
						:to="localePath(FORGOT_PASSWORD_ROUTER)"
						block
						class="forget-link text-decoration-none text-black"
					>
						{{ $t("auth.forgetPassword") }}
					</nuxt-link>
				</v-col>
			</template>
			<template #btn>
				<CoreBtn
					block
					class="rounded-lg"
					type="submit"
					:loading="loadingStore.loginLoading"
					:disabled="loadingStore.loginLoading"
					>{{ $t("button.login") }}
				</CoreBtn>
			</template>
		</CoreForm>
	</div>
</template>

<script lang="ts" setup>
const { t } = useI18n({});
const mainStore = useMainStore();
const loadingStore = useLoadingStore();
const LoginFormData: [] = ref([
	{
		init_val: "",
		type: "text",
		key: "identity_input",
		name: t("field.email"),
		placeholder: t("field.email"),
		label: t("field.email"),
		col: "col-12",
		rules: "required|email",
		id: "login-identity",
	},
	{
		init_val: "",
		type: "password",
		key: "password",
		name: t("field.password"),
		placeholder: t("field.password"),
		label: t("field.password"),
		col: "col-12",
		rules: "required",
		id: "login-password",
	},
]);

const login = async (event) => {
	await mainStore.login(event);
};

// useHead({
// 	title: t('auth.loginTitle')
// })

definePageMeta({
	layout: "auth",
	middleware: ["guest"],
	auth: false,
});
</script>
