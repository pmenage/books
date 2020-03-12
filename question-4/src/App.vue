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

<style>
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500,600,700,800,900");

#app {
	font-family: "Rubik", sans-serif;
	background-color: #f5f1ed;
}
</style>
