import * as maptalks from 'maptalks';
import { createApp, defineComponent } from 'vue';
import ElementPlus from 'element-plus';
import { CloseBold } from '@element-plus/icons-vue';
import { getMap } from '@/components/VMap/mapInstance.js';

export function initMarkerClick() {
  const map = getMap();

  let lastPop;

  map.on('click', e => {
    if (map.mm.enablePop === false) return;
    const layerList = ['mPoints', 'mPointsLabel', 'mPolyline', 'mPolygon'];
    map.identify(
      {
        coordinate: e.coordinate,
        layers: map.getLayers(layer => layerList.includes(layer.getId()))
      },
      function (geos) {
        removePop();
        if (!geos.length) return;
        showPop(geos[0]);
      }
    );
  });

  map.mm.removePop = removePop;
  map.mm.showPop = showPop;

  function removePop() {
    if (lastPop) {
      lastPop.remove();
      lastPop = null;
    }
  }

  function showPop(geo) {
    if (map.mm.enablePop === false) return;
    const layerId = geo.getLayer().getId();
    // 点击到文字标注时，将弹窗放置到图标上
    if (layerId === 'mPointsLabel') {
      geo = map.getLayer('mPoints').getGeometryById(geo.getId());
    }
    const pop = new maptalks.ui.InfoWindow({
      custom: true,
      content: '<div class="w-[300px]"  id="mm-marker-pop"></div>'
    });
    lastPop = pop;
    pop.addTo(geo);
    pop.on('remove', () => {
      if (pop.mm.vm) pop.mm.vm.unmount();
    });
    // 点
    if (layerId === 'mPoints' || layerId === 'mPointsLabel')
      geo.openInfoWindow();
    // 线
    if (layerId === 'mPolyline') pop.show(geo.getCoordinates()[0]);
    if (layerId === 'mPolygon') pop.show(geo.getCoordinates()[0][0]);

    // 缩放到该点
    const ele = map.getContainer();
    const height = ele.offsetHeight;
    let center;
    // 点
    if (layerId === 'mPoints' || layerId === 'mPointsLabel')
      center = map.locateByPoint(geo.getCoordinates(), 0, -(height / 3));
    // 线
    if (layerId === 'mPolyline')
      center = map.locateByPoint(geo.getCoordinates()[0], 0, -(height / 3));
    if (layerId === 'mPolygon')
      center = map.locateByPoint(geo.getCoordinates()[0][0], 0, -(height / 3));
    map.animateTo({
      center: center
    });

    const data = geo.properties;
    const hasTable =
      data.table.length > 1 || (data.table[0]?.key && data.table[0]?.value);

    const onDel = () => {
      if (layerId === 'mPoints' || layerId === 'mPointsLabel')
        map.mm.removePointConfirm(data.id);
      else if (layerId === 'mPolyline') map.mm.removePolylineConfirm(data.id);
      else if (layerId === 'mPolygon') map.mm.removePolygonConfirm(data.id);
    };
    const onEdit = () => {
      if (layerId === 'mPoints' || layerId === 'mPointsLabel')
        map.mm.editPointConfirm(data);
      else if (layerId === 'mPolyline') map.mm.editPolylineConfirm(data);
      else if (layerId === 'mPolygon') map.mm.editPolygonConfirm(data);
    };
    const onMove = () => {
      if (layerId === 'mPoints' || layerId === 'mPointsLabel')
        map.mm.movePointStart(data.id);
      else if (layerId === 'mPolyline') map.mm.movePolylineStart(data.id);
      else if (layerId === 'mPolygon') map.mm.movePolygonStart(data.id);
    };

    const component = defineComponent({
      components: { CloseBold },
      setup() {
        return () => (
          <div
            className={
              'relative flex bg-white max-h-[400px] w-full p-[10px] rounded-[5px] drop-shadow-2xl text-[14px] text-gray-500'
            }
          >
            <el-icon
              className={
                'absolute top-[3px] right-[4px] h-[12px] w-[12px] cursor-pointer text-gray-500'
              }
              onClick={() => removePop()}
            >
              <close-bold />
            </el-icon>

            <div className={'flex-1 mb-[20px] overflow-auto'}>
              <div className={'w-full h-[1px] my-[15px] bg-gray-400'}></div>
              <div>
                <span> 名称：</span>
                <span> {data.name}</span>
              </div>

              <div className={'w-full h-[1px] my-[15px] bg-gray-400'}></div>
              <div>
                <span> 标签：</span>
                {!data.tags.length ? (
                  <el-tag type={'info'}>暂无标签</el-tag>
                ) : (
                  data.tags.map(item => (
                    <span className={'mr-[4px]'}>
                      <el-tag>{item}</el-tag>
                    </span>
                  ))
                )}
              </div>

              <div className={'w-full h-[1px] my-[15px] bg-gray-400'}></div>
              <div>
                <span> 数据：</span>
                {!hasTable ? (
                  <el-tag type={'info'}>暂无表格</el-tag>
                ) : (
                  <div className={'overflow-auto ml-[40px]'}>
                    {data.table.map(item => (
                      <div className={'whitespace-nowrap'}>
                        <span className={'mr-[2px] whitespace-nowrap'}>
                          {item.key}：
                        </span>
                        <span className={'whitespace-nowrap'}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={'w-full h-[1px] my-[15px] bg-gray-400'}></div>
            </div>
            <div className={'flex justify-evenly absolute bottom-[5px] w-full'}>
              <el-button onClick={onDel}>删除</el-button>
              <el-button onClick={onMove}>图形编辑</el-button>
              <el-button onClick={onEdit}>属性编辑</el-button>
            </div>
          </div>
        );
      }
    });
    const vm = createApp(component);
    vm.use(ElementPlus);
    vm.mount('#mm-marker-pop');
    pop.mm.vm = vm;
  }
}
