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
.books-table.theme--light.v-data-table
	padding: 10px
	border-radius: 5px
	margin: 50px

	@media (max-width: 500px)
		margin: 10px

	thead tr
		&:last-child th
			border-bottom: none

		th
			text-transform: uppercase
			color: #a4a4a4
			font-size: 14px
			font-weight: 500

			&:not(:first-of-type)
				text-align: center !important

	tbody tr:not(:last-child)
		cursor: pointer
		border-bottom: none

		&:nth-of-type(odd)
			background-color: #faf9f7

		td
			&:last-child, &:not(.v-data-table__mobile-row)
				border-bottom: none

	.book-description
		padding: 20px 16px

		strong
			font-weight: 500

.table-title.v-toolbar__title
	color: #2a2a2a
	font-size: 20px
	font-weight: 500
	white-space: normal
</style>
