<script>
export default {
    name: 'ShowCard',
    props: { apartment: Object, isDetail: Boolean },
    computed: {
        // abstract() {
        //     const abstract = this.project.content.slice(0, 200);
        //     return abstract + '[...]';
        // },
        // publicationDate() {
        //     const date = new Date(this.project.created_at);
        //     let day = date.getDate();
        //     let month = date.getMonth();
        //     const year = date.getFullYear();
        //     let hours = date.getHours();
        //     let minutes = date.getMinutes();
        //     // const seconds = date.getSeconds();

        //     if (day < 10) day = '0' + day;
        //     if (month < 10) month = '0' + month;
        //     if (hours < 10) hours = '0' + hours;
        //     if (minutes < 10) minutes = '0' + minutes;

        //     return `${day}/${month}/${year} alle ${hours}:${minutes}`;
        // }
    }
};
</script>