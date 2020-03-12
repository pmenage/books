<template>
	<fragment>
		<td class="book-column">
			<v-row class="book-column__title">
				<v-col lg="3" md="4" sm="5">
					<v-img class="book-column__title__thumbnail" :src="book.thumbnailURLSmall" />
				</v-col>
				<v-col lg="9" md="8" sm="7" class="book-column__title__information">
					<v-row class="book-column__title__information__title">{{book.title}}</v-row>
					<v-row class="book-column__title__information__author">{{book.author}}</v-row>
				</v-col>
			</v-row>
		</td>
		<td class="book-column">
			<v-row justify="center">{{book.yearPublished}}</v-row>
		</td>
		<td class="book-column">
			<v-row justify="center">{{book.rating}}/10</v-row>
		</td>
		<td class="book-column">
			<v-row v-if="book.buyOnAmazon" justify="center" class="book-column__buy">
				<a :href="book.buyOnAmazon">Amazon</a>
			</v-row>
			<v-row v-if="book.buyOnIBooks" justify="center" class="book-column__buy">
				<a :href="book.buyOnIBooks">iBooks</a>
			</v-row>
			<v-row v-if="book.buyOnPlayStore" justify="center" class="book-column__buy">
				<a :href="book.buyOnPlayStore">Play Store</a>
			</v-row>
		</td>
	</fragment>
</template>

<script>
export default {
	name: "Book",
	props: ["book"]
};
</script>

<style lang="sass">
.books-table.theme--light.v-data-table
    .book-column
        &__title
            &__thumbnail
                height: 100px
                width: 70px
                border-radius: 10px

            &__information
                &__title
                    font-weight: 500

                &__author
                    color: #a4a4a4

        &__buy
            a
                text-decoration: none
                color: #bfd488
                font-weight: 500
</style>>
