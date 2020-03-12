<template>
	<v-container>
		<h1>Most popular Books of All time</h1>
		<v-data-table
			:headers="headers"
			:items="indexedItems"
			:items-per-page="5"
			:single-expand="singleExpand"
			item-key="id"
			class="elevation-1"
		>
			<template v-slot:item="{item, isExpanded, expand}">
				<tr @click="expand(!isExpanded)">
					<td>
						<v-row>
							<v-col>
								<v-img :src="item.thumbnailURLSmall" height="150" width="100" />
							</v-col>
							<v-col>
								<div>{{item.title}}</div>
								<div>{{item.author}}</div>
							</v-col>
						</v-row>
					</td>
					<td>
						<v-row>{{item.rating}}/10</v-row>
					</td>
					<td>
						<v-row>{{item.yearPublished}}</v-row>
					</td>
					<td>
						<v-row>
							<a v-if="item.buyOnAmazon" :href="item.buyOnAmazon">Amazon</a>
						</v-row>
						<v-row>
							<a v-if="item.buyOnIBooks" :href="item.buyOnIBooks">iBooks</a>
						</v-row>
						<v-row>
							<a v-if="item.buyOnPlayStore" :href="item.buyOnPlayStore">Play Store</a>
						</v-row>
					</td>
				</tr>
			</template>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">{{ item.description }}</td>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
import books from "@/assets/books.json";

export default {
	name: "Books",
	data() {
		return {
			singleExpand: true,
			headers: [
				{ text: "Title", value: "title" },
				{ text: "Published", value: "yearPublished" },
				{ text: "Rating", value: "rating" },
				{ text: "Buy on", value: "buyOn" }
			],
			books: books
		};
	},
	computed: {
		indexedItems() {
			return this.books.map((book, index) => ({
				id: index,
				...book
			}));
		}
	}
};
</script>

<style scoped lang="scss">
</style>
