import ol from 'openlayers';
import {FeatureTheme} from '@supermap/iclient-common';
import {Graph} from './Graph';

/**
 * @class ol.source.RankSymbol
 * @category  Visualization Theme
 * @classdesc 等级符号专题图图层源。
 * @param name - {string} 专题图层名
 * @param symbolType -{string} 标志类型
 * @param opt_options -{Object} 参数，如：<br>
 *        id - {string} 专题图层ID。</br>
 *        map - {ol.Map} 当前map对象。</br>
 *        opacity - {number} 图层透明的。</br>
 *        attributions - {string|Object} 版权信息。 </br>
 *        logo - {string} Logo</br>
 *        projection - [{ol.proj.Projection}]{@linkdoc-openlayers/ol.proj.Projection} 投影信息。</br>
 *        ratio - {number} 视图比, 1表示画布是地图视口的大小，2表示地图视口的宽度和高度的两倍，依此类推。 必须是1或更高。 默认值是1.5。</br>
 *        resolutions - {Array} 分辨率数组。</br>
 *        state - {[ol.source.html#.State]}{@linkdoc-openlayers/ol.source.html#.State} 资源状态。<br>
 *        themeFields - {string} 指定创建专题图字段。 <br>
 *        isOverLay - {boolean} 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表,默认值：true。<br>
 *        chartsType - {string}图表类型。目前可用："Bar", "Line", "Pie"。<br>
 *        chartsSetting - {Object} 各类型图表的 chartsSetting 对象可设属性请参考具体图表模型类的注释中对 chartsSetting 对象可设属性的描述。chartsSetting 对象通常都具有以下 5 个基础可设属性:<br>
 *  * width - {number} 专题要素（图表）宽度，必设参数。
 *  * height - {number} 专题要素（图表）高度，必设参数。
 *  * codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
 *  * XOffset - {number} 专题要素（图表）在 X 方向上的偏移值，单位像素。
 *  * YOffset - {number} 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 *  * dataViewBoxParameter - {Array{number}} 数据视图框 dataViewBox 参数，
 *  它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 *  * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。
 *  如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @extends ol.source.Graph
 */
export class RankSymbol extends Graph {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
    }

    /**
     * @function ol.source.RankSymbol.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        Graph.prototype.destroy.apply(this, arguments);
    }

    /**
     * @function ol.source.RankSymbol.prototype.setSymbolType
     * @description 设置标志符号
     * @param symbolType -{string} 符号类型
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @private
     * @function ol.source.RankSymbol.prototype.createThematicFeature
     * @description 创建专题图形要素
     * @param feature -{Object} 要创建的专题图形要素
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (FeatureTheme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new FeatureTheme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return Graph.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

ol.source.RankSymbol = RankSymbol;