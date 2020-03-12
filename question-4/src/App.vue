<template>
	<v-app>
		<v-content>
			<Books />
		</v-content>
	</v-app>
</template>

<script>
import Books from "./components/Books";

export default {
	name: "App",

	components: {
		Books
	}
};
</script>
