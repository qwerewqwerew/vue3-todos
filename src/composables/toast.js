import { ref, onUnmounted } from 'vue';
export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("");
  let toastTimeout = ref(null);
  let timeout = ref(null);
  const triggerToast = (message, type = "info") => {
    toastMessage.value = message;
    toastAlertType.value = type;
    showToast.value = true;
    toastTimeout.value = setTimeout(() => {
      toastMessage.value = "";
      toastAlertType.value = "";
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    clearTimeout(timeout.value);
  })
  return {
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast
  }
}
