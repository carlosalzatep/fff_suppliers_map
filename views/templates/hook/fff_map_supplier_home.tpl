<div id="suppliers_map">
    <h2 class="title-mods">{$FFF_MAP_SUPPLIERS_HOME_TITLE|escape:'html'}</h2>
    
    {literal}
    <script>              
        var mapSuppliers = {/literal}{$Mapsupplier|json_encode nofilter}{literal};    
    </script>
    {/literal}

    <div id="map" ></div>
    
    <div class="cta m-2">
        <a href="./suppliermap" class="btn btn-primary">VOIR LA CARTE ENTIÈRE</a>
    </div>
    
    {literal}
    <script>
        const C_GoogleAPIKey = '{/literal}{$GoogleAPIKey}{literal}';
        console.log('C_GoogleAPIKey:' + C_GoogleAPIKey);
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key={/literal}{$GoogleAPIKey}{literal}&callback=initMap" defer></script>
    {/literal}

</div>