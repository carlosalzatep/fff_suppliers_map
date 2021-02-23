
{literal}
<script>
    //var mapSuppliers = mapSuppliersTotal;
</script>
{/literal}

{foreach key=key item=item from=$supplier name=foo}
    {if $item.latitude != '' && $item.longitude != ''}
        <div id="sp-{$item.id_supplier}" class="col-md-4 mb-1 mt-1">
            <a onmouseover="showme({$smarty.foreach.foo.iteration-1})" onmouseout="showme(-1)" href='{$item.url}' data-idsupplier='{$item.id_supplier}' data-latitude='{$item.latitude}' data-longitude='{$item.longitude}' data-image='{$item.image}'>
                <div class="supplier-thumbnail">
                    <img title='{$item.name|escape:"htmlall"}' src='{$item.image}' >
                </div>
            </a>
        </div>
        {literal}
        <script>
            //mapSuppliers.push({id_supplier:'{/literal}{$item.id_supplier}{literal}',latitude:'{/literal}{$item.latitude}{literal}',longitude:'{/literal}{$item.longitude}{literal}'});
        </script>
        {/literal}
    {/if}
{/foreach}

