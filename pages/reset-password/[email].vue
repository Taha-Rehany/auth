<template>
	<div v-if="!tokenSent">
		<CoreCard classes="text-center">
			<template #title>
				<h2>{{ $t("auth.loginTitle") }}</h2>
			</template>
			<template #text>
				<p>{{ $t("otp.inputOtp") }}</p>
			</template>
		</CoreCard>
		<FormOtp :digit-count="4" @update:otp="otp = $event"></FormOtp>
		<div class="text-center mb-5">
			<p>{{ $t("otp.remainingTime") }} {{ remainingTime }}</p>
		</div>
		<CoreBtn
			:block="true"
			:label="$t('button.confirmVerificationCode')"
			class="rounded-lg"
			type="submit"
			:loading="loadingStore.verifyOtpLoading"
			:disabled="otp === '' || loadingStore.verifyOtpLoading"
			@click="verifyOtp"
		/>
		<div class="text-center mt-5">
			<p>
				{{ $t("otp.didNotReceiveCode") }}
				<span class="resend" @click="resendCode">
					{{ $t("otp.resendSMS") }}
				</span>
			</p>
		</div>
	</div>
	<div v-else>
		<CoreForm
			method="post"
			:passed-form-data="resetPassFormData"
			:req-route="FORGET_PASSWORD_LOCAL"
			:reset-on-submit="false"
			:submit-from-parent="true"
			@submitClicked="changePassword"
		>
			<template #btn>
				<CoreBtn
					:block="true"
					:label="$t('button.createPassword')"
					class="rounded-lg"
					type="submit"
					:loading="loadingStore.createPasswordLoading"
					:disabled="loadingStore.createPasswordLoading"
				/>
			</template>
		</CoreForm>
	</div>
</template>

<script lang="ts" setup>
import MainService from "~/services/MainService";
import useCustomLocalePath from "~/composables/useCustomLocalePath";

const { t } = useI18n({});
const mainService = new MainService();
const email = ref(useRoute().params.email);
const otp = ref("");
const tokenSent = ref(false);
const remainingTime = ref("");
const { startCounter, resetCounter, stopCounter, remainingTimeCounter } =
	useCounter();
const { getLocalePath } = useCustomLocalePath();
const loadingStore = useLoadingStore();
const resetPassFormData: [] = ref([
	{
		init_val: "",
		type: "password",
		key: "password",
		name: t("field.password"),
		placeholder: t("field.password"),
		label: t("field.password"),
		col: "col-12",
		rules: "required",
		id: "reset-password-1",
	},
	{
		init_val: "",
		type: "password",
		key: "password_confirmation",
		name: t("field.passwordConfirmation"),
		placeholder: t("field.passwordConfirmation"),
		label: t("field.passwordConfirmation"),
		col: "col-12",
		rules: "required",
		id: "reset-password-2",
	},
]);

const changePassword = (event) => {
	//add token and email to body data before submit
	event.token = otp.value;
	event.identity_input = email.value;
	loadingStore.changeCreatePasswordLoading(true);
	mainService
		.requestData(RESET_PASSWORD_LOCAL, {}, event, "post")
		.then((res) => {
			loadingStore.changeCreatePasswordLoading(false);
			if (res.data) {
				navigateTo(getLocalePath(LOGIN_ROUTER));
			}
		});
};

const verifyOtp = () => {
	loadingStore.changeVerifyOtpLoading(true);
	mainService
		.requestData(
			VERIFY_PASSWORD_TOKEN_LOCAL,
			{},
			{
				identity_input: email.value,
				token: otp.value,
			},
			"post"
		)
		.then((res) => {
			loadingStore.changeVerifyOtpLoading(false);
			if (res.data) {
				tokenSent.value = true;
				stopCounter();
			}
		});
};

const resendCode = () => {
	mainService
		.requestData(
			FORGET_PASSWORD_LOCAL,
			{},
			{
				identity_input: email.value,
			},
			"post"
		)
		.then((res) => {
			if (res.data) {
				resetCounter();
			}
		});
};

onMounted(() => {
	startCounter();
	remainingTime.value = remainingTimeCounter.value;
	watch(remainingTimeCounter, (newValue) => {
		remainingTime.value = newValue;
	});
});
useHead({
	// title: t('auth.loginTitle')
});
definePageMeta({
	layout: "auth",
	middleware: ["guest"],
	auth: false,
});
</script>

<style lang="scss" scoped>
.resend {
	color: #4dbb7e;
	cursor: pointer;
}
</style>
