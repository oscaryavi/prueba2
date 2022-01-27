Vue.component('hijo',{
    template://html
    `
        <div class="p-5 bg-success">
            <h4>Compnnente hijo</h4>
            <h5>{{numero}}</h5>
        </div>
    `,
    props:['numero']
});