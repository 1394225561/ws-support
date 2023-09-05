A web service transformation support tool
# ws-support
**用于支持web service，构造xml数据结构发起请求，解析接口返回的xml结构返回值**  

## 基本使用方法
```javascript
import wss from 'ws-support'

const xmlData = wss.getXmlData(params, 'get')

const responseData = await crypto.parseXML(response)

```

## API
```javascript
/**
 * @description 构造发起请求时需要的xml结构的数据
 * @param params {Object} 请求参数
 * @param method {String} 请求类型 get/post/等等。。。
 * @return {String} xml数据字符串
 */
function getXmlData (params, method) {}

/**
 * @description 将url后通过 ? 拼接的参数解析为对象类型返回
 * @param url {String} 请求url /api/test?a=1&b=2
 * @return {Object} 参数的对象形式 {a:1, b:2}
 */
function urlParamsToObj (url) {}

/**
 * @description 解析服务端返回的xml格式数据为对象
 * @param xml {String} 服务端返回的xml格式的数据
 * @return {Object | String} 通过xml解析出的body内容，类型为对象。当body内容为空时，返回空字符串
 */
function parseXML (xml) {}

/**
 * @description 当服务端返回的xml内容包含 “<!DOCTYPE” 时的特殊处理方法。“<!DOCTYPE”会导致xml格式不合法报错。
 * DTD（Document Type Definition）
 * @param xmlData {String} 服务端返回的xml格式的数据
 * @param isGetPreviewContent {Boolean} 是否直接获取xml的body内容
 * @return {Object} 处理后的返回值 textContent：特殊字符包含的内容（以<!DOCTYPE 开始，以</html> 结束）
 *                                resultXmlData：xml解析后的完整内容
 */
function handleDTDString (xmlData, isGetPreviewContent) {}
```