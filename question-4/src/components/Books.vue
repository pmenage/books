<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="indexedBooks"
			:items-per-page="5"
			:single-expand="singleExpand"
			class="books-table"
			item-key="id"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title class="table-title">Most popular Books of All time</v-toolbar-title>
				</v-toolbar>
			</template>
			<template v-slot:item="{item, isExpanded, expand}">
				<tr class="books-table__book-row" @click="expand(!isExpanded)">
					<Book :book="item" />
				</tr>
			</template>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length" class="book-description" v-html="item.description"></td>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
import books from "@/assets/books.json";
import Book from "@/components/Book";

export default {
	name: "Books",
	components: {
		Book
	},
	data() {
		return {
			singleExpand: true,
			headers: [
				{ text: "Title", sortable: false, value: "title" },
				{ text: "Published", sortable: false, value: "yearPublished" },
				{ text: "Rating", sortable: false, value: "rating" },
				{ text: "Buy on", sortable: false, value: "buyOn" }
			],
			books: books
		};
	},
	computed: {
		indexedBooks() {
			return this.books.map((book, index) => ({
				id: index,
				...book
			}));
		}
	}
};
</script>

<style lang="sass">
@import "@/sass/_variables.sass"
.books-table.theme--light.v-data-table
	padding: 10px
	border-radius: 5px
	margin: 50px

	@media (max-width: 500px)
		margin: 10px

	thead tr
		&:last-child th
			border-bottom: none
			text-transform: uppercase
			color: $table-secondary-color
			font-size: 14px
			font-weight: 500

			&:not(:first-of-type)
				text-align: center !important

	tbody
		tr:not(:last-child)
			cursor: pointer
			border-bottom: none

			&:nth-of-type(odd)
				background-color: $table-odd-rows-color

			td
				&:last-child, &:not(.v-data-table__mobile-row)
					border-bottom: none

		tr:last-child
			background-color: $table-odd-rows-color

	.book-description
		padding: 20px 16px

		strong
			font-weight: 500

	.v-data-footer
		border-bottom: none

.table-title.v-toolbar__title
	color: $table-primary-color
	font-size: 20px
	font-weight: 500
	white-space: normal
</style>
