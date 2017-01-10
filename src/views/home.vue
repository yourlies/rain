<template>
    <div class="rain">
        <a>我勒个去</a>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    mounted () {
        this.$store.dispatch('bubbleDelegation', 'say');
    }
}
</script>