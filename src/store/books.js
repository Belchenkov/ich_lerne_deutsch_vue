export default {
    state: {
        books: [
            {
                id: 'dfwgd34534terter',
                title: 'Harry Potter und Stein der Weisen - 1',
                description: 'Первая глава первой книги о Гарри Поттере',
                imageId: 'ffssssssssssd44dfdsf',
                level: ['B2', 'C1'],
                rating: 4,
                ratingsCount: 100,
                youtube_playlist_id: 'sdfdf32fdfdf4',
                parts: [
                    {
                        id: 'dsfsdfsfsfsdf',
                        title: 'Kapitel 1',
                        youtube_id: 'adfadsfsfafsf'
                    },
                    {
                        id: 'dsfsdfsfsfsdf2',
                        title: 'Kapitel 2',
                        youtube_id: 'adfadsfsfafsf2'
                    },
                    {
                        id: 'dsfsdfsfsfsdf3',
                        title: 'Kapitel 3',
                        youtube_id: 'adfadsfsfafsf3'
                    },
                    {
                        id: 'dsfsdfsfsfsdf4',
                        title: 'Kapitel 4',
                        youtube_id: 'adfadsfsfafsf4'
                    }
                ]
            },
            {
                id: 'dfgd34534terteer',
                title: 'Harry Potter und Stein der Weisen - 2',
                description: 'Вторая глава первой книги о Гарри Поттере',
                imageId: 'ffssss434ssd44dfdsf',
                level: ['B1', 'B2'],
                rating: 3.6,
                ratingsCount: 57,
                youtube_playlist_id: '34dsdfdf32fdfdf4',
                parts: [
                    {
                        id: 'dsfsdfsfsfsdf',
                        title: 'Kapitel 1',
                        youtube_id: 'adfadsfsfafsf'
                    },
                    {
                        id: 'dsfsdfsfsfsdf2',
                        title: 'Kapitel 2',
                        youtube_id: 'adfadsfsfafsf2'
                    },
                    {
                        id: 'dsfsdfsfsfsdf3',
                        title: 'Kapitel 3',
                        youtube_id: 'adfadsfsfafsf3'
                    },
                    {
                        id: 'dsfsdfsfsfsdf4',
                        title: 'Kapitel 4',
                        youtube_id: 'adfadsfsfafsf4'
                    }
                ]
            },
            {
                id: '44dsfdfsdf4335',
                title: 'Harry Potter und Stein der Weisen - 3',
                description: 'Третья глава первой книги о Гарри Поттере',
                imageId: 'ffdfsss434ssd44dfdsf',
                level: ['A2'],
                rating: 2,
                ratingsCount: 80,
                youtube_playlist_id: '34dsdfdf32fdfdf4fg',
                parts: [
                    {
                        id: 'dsfsdfsfsfsdf',
                        title: 'Kapitel 1',
                        youtube_id: 'adfadsfsfafsf'
                    },
                    {
                        id: 'dsfsdfsfsfsdf2',
                        title: 'Kapitel 2',
                        youtube_id: 'adfadsfsfafsf2'
                    },
                    {
                        id: 'dsfsdfsfsfsdf3',
                        title: 'Kapitel 3',
                        youtube_id: 'adfadsfsfafsf3'
                    },
                    {
                        id: 'dsfsdfsfsfsdf4',
                        title: 'Kapitel 4',
                        youtube_id: 'adfadsfsfafsf4'
                    }
                ]
            }
        ]
    },
    getters: {
        getBooks: (state) => state.books
    },
    mutations: {
        SET_BOOKS(state, payload) {
            state.books = payload;
        }
    }
}
