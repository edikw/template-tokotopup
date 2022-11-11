<template>
  <div class="mb-4">
    <label for="" class="text-sm text-gray-500">{{ label }}</label>
    <div class="relative">
      <input
        :value="value"
        :required="required"
        :type="typeInput"
        class="
          block
          w-full
          border
          py-2
          rounded-lg
          focus:border-primary-default focus:outline-none
          px-3
        "
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
    </div>

    <div v-if="type === 'password'" class="flex items-center gap-x-1 mt-2">
      <input v-model="showPassword" type="checkbox" />
      <span class="text-xs"> Lihat Password </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'type', 'required', 'placeholder', 'value'],
  data() {
    return {
      show: false,
      showPassword: false,
      typeInput: '',
    }
  },
  watch: {
    showPassword: {
      handler(r) {
        this.typeInput === 'password'
          ? (this.typeInput = 'text')
          : (this.typeInput = 'password')
      },
    },
  },
  mounted() {
    this.typeInput = this.type
    if (this.type === 'password') {
      this.show = true
    }
  },
}
</script>
