<template>
<navigation></navigation>
<banner></banner>
<loading></loading>
</template>
<script>
import navigation from '../../themes/default/navigation';
import banner from '../../themes/default/banner';
import loading from '../../components/loading';

export default {
    components: {
        navigation, banner, loading
    }
}
</script>