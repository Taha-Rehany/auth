<template>
	<div>
		<CoreCard classes="text-center mb-5">
			<template #title>
				<h2>{{ $t("auth.forgetTitle") }}</h2>
			</template>
			<template #text>
				<p>{{ $t("auth.forgetSubtitle") }}</p>
			</template>
		</CoreCard>
		<CoreForm
			method="post"
			:passed-form-data="forgetFormData"
			:req-route="FORGET_PASSWORD_LOCAL"
			:reset-on-submit="false"
			:submit-from-parent="false"
			btn-label="button.resetPassword"
			@submitted="handleForgetPassword"
		></CoreForm>
	</div>
</template>

<script lang="ts" setup>
import useCustomLocalePath from "~/composables/useCustomLocalePath";

const { t } = useI18n({});
const { getLocalePath } = useCustomLocalePath();
const forgetFormData: [] = ref([
	{
		init_val: "",
		type: "text",
		key: "identity_input",
		name: t("field.email"),
		placeholder: t("field.email"),
		label: t("field.email"),
		col: "col-12",
		rules: "required|email",
		id: "reset-password-identity",
	},
]);

const handleForgetPassword = (event) => {
	navigateTo(getLocalePath(RESET_PASSWORD_ROUTER + event["identity_input"]));
};

useHead({
	// title: t('auth.loginTitle')
});
definePageMeta({
	layout: "auth",
	middleware: ["guest"],
	auth: false,
});
</script>
