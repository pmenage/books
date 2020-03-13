<template>
	<v-app>
		<v-content>
			<Books />
		</v-content>
	</v-app>
</template>

<script>
import Books from "@/components/Books";

export default {
	name: "App",

	components: {
		Books
	}
};
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500,600,700,800,900")
@import "@/sass/_variables.sass"

#app
	font-family: "Rubik", sans-serif
	background-color: $background-color
</style>
