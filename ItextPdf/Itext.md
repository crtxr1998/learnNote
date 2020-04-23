# I<b style="color:#F99E27">T</b>EX<b style="color:#F99E27">T</b>

### 前言

**最近新需求要针对已经学完课程的同学提供下载结业证书。最终采用pdf方式让用户进行下载。操作pdf java 一般都是通过itext来实现，由于之前没有使用itext生成pdf，就去百度搜索先关信息。大部分都是通过pdf模板进行生成证书相关信息。但是却发现大部分过于复杂，我只想下简单的填充一下表单数据，无奈只能去官网看看example。**

 　**官网在线演案例**：https://itextpdf.com/en/demos 

　 **官网Java/C#案例**：https://itextpdf.com/en/tags/itext-7-examples  

- **<b style="color:#2783F9">通过Acrobat Reader DC 来设置动态表单</b>**.  **(自行baidu/google下载)**

- **<b style="color:#2783F9">填充表单数据</b>**

引入**pom**依赖

```java
<!-- pdf转图片 -->   
<dependency>
      <groupId>org.apache.pdfbox</groupId>
      <artifactId>pdfbox</artifactId>
      <version>2.0.19</version>
    </dependency>
<!-- pdf表单 -->   
    <dependency>
      <groupId>com.itextpdf</groupId>
      <artifactId>forms</artifactId>
      <version>7.1.0</version>
    </dependency>
<!-- pdf字体 --> 
    <dependency>
      <groupId>com.itextpdf</groupId>
      <artifactId>font-asian</artifactId>
      <version>7.1.0</version>
    </dependency>
  <!-- 所有依赖（推荐  避免有依赖导致奇怪的异常） --> 
  <dependency>
      <groupId>com.itextpdf</groupId>
      <artifactId>itext7-core</artifactId>
      <version>7.1.0</version>
</dependency>
```

**<b style="color:#E86D6D">pdf工具类</b>**

```java
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;

import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * iText Pdf属性表单数据填充
 */

public class PdfReplaceFormField {

  /**
   * 默认实现
   *
   * @param src 原始pdf输入字节数组
   * @param map 需要填充的表单数据
   * @return
   * @throws Exception
   */
  public static byte[] byteProcess(byte[] src, Map<String, String> map) throws Exception {
    //输出流
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    //获取文档
    PdfDocument pdfDoc = new PdfDocument(new PdfReader(new ByteArrayInputStream(src)), new PdfWriter(outputStream));
    //转换为表单
    PdfAcroForm form = PdfAcroForm.getAcroForm(pdfDoc, true);
    //属性填充
    for (Map.Entry<String, String> entry : map.entrySet()) {
      form.getField(entry.getKey()).setValue(entry.getValue());
    }
    //锁定字段
    form.flattenFields();
    pdfDoc.close();
    return outputStream.toByteArray();
  }

  /**
   * 简单文本填充
   *
   * @param src 原始文件路径
   * @param out 输出文件路径
   * @param map 填充数据
   * @return
   * @throws Exception
   */
  public static byte[] fileProcess(String src, String out, Map<String, String> map) throws Exception {
    //输出流
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    //获取文档
    PdfDocument pdfDoc = new PdfDocument(new PdfReader(new File(src)), new PdfWriter(new File(out)));
    //转换为表单
    PdfAcroForm form = PdfAcroForm.getAcroForm(pdfDoc, false);
    //属性填充
    for (Map.Entry<String, String> entry : map.entrySet()) {
      form.getField(entry.getKey()).setValue(entry.getValue());
    }
    //锁定字段
    form.flattenFields();
    pdfDoc.close();
    return outputStream.toByteArray();
  }


  /**
   * pdf转图片
   *
   * @param src 原始pdf输入字节数组
   * @param dpi
   * @return
   * @throws Exception
   */
  public static BufferedImage imageProcess(byte[] src, int dpi) throws Exception {
    //转换图片加上系统参数 可使用-Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider
    //System.setProperty("sun.java2d.cmm","sun.java2d.cmm.kcms.KcmsServiceProvider");
    PDDocument document = PDDocument.load(src);
    PDFRenderer pdfRenderer = new PDFRenderer(document);
    // note that the page number parameter is zero based
    BufferedImage bim = pdfRenderer.renderImageWithDPI(0, dpi, ImageType.RGB);
    // suffix in filename will be used as the file format
    document.close();
    return bim;
  }


  public static void main(String[] args) throws Exception {
    String local = "C:/Users/Crouten/Desktop/";
    Map<String, Object> imageMap = new HashMap<>();
    imageMap.put("name", "我");
    imageMap.put("icon", ImageDataFactory.create(local + "pig.png"));
    //表单属性填充图片
    replaceFieldPdf(local + "demo.pdf",
      local + "demoOutEnd.pdf",
      imageMap);
  }


  /**
   * 替换PDF图片表单域（文本）变量，
   * 1、获取表单域的大小；
   * 2、根据表单域的位置，确定图片的位置；
   * 3、如果图片的宽或者高大于表单域，则等比压缩图片。
   *
   * @param templatePdfPath 要替换的pdf全路径
   * @param params          替换参数
   * @param destPdfPath     替换后保存的PDF全路径
   * @throws FileNotFoundException
   * @throws IOException
   */
  public static final void replaceFieldPdf(String templatePdfPath, String destPdfPath,
                                           Map<String, Object> params) throws FileNotFoundException, IOException {
    PdfDocument pdf = new PdfDocument(new PdfReader(templatePdfPath), new PdfWriter(destPdfPath));
    if (Objects.nonNull(params) && !params.isEmpty()) {// 有参数才替换
      PdfAcroForm form = PdfAcroForm.getAcroForm(pdf, true);
      Map<String, PdfFormField> fields = form.getFormFields(); // 获取所有的表单域
      //属性填充
      for (Map.Entry<String, Object> entry : params.entrySet()) {
        if (entry.getValue() instanceof String) {
          form.getField(entry.getKey()).setValue(entry.getValue().toString());
          //如果是图片则替换
        } else if (entry.getValue() instanceof ImageData) {
          PdfFormField formField = fields.get(entry.getKey());
          if (Objects.nonNull(formField)) {
            replaceFieldImage(params, pdf, entry.getKey(), formField); // 替换图片
          }
        }
      }
      form.flattenFields();// 锁定表单，不让修改
    }
    pdf.close();
  }


  /**
   * 替换域中的图片
   *
   * @param params
   * @param pdf
   * @param param
   * @param formField
   * @throws MalformedURLException
   */
  private static void replaceFieldImage(Map<String, Object> params, PdfDocument pdf, String param,
                                        PdfFormField formField) throws MalformedURLException {
    ImageData value = (ImageData) params.get(param);
    Rectangle rectangle = formField.getWidgets().get(0).getRectangle().toRectangle(); // 获取表单域的xy坐标
    //pdf画板
    PdfCanvas canvas = new PdfCanvas(pdf.getFirstPage());
    ImageData image = value;
    //图片属性
    float imageWidth = image.getWidth();
    float imageHeight = image.getHeight();
    //表单属性
    float rectangleWidth = rectangle.getWidth();
    float rectangleHeight = rectangle.getHeight();
    //Canvas画板得高度
    float tempWidth = 0;
    float tempHeight = 0;
    int result = 1; // 压缩宽度
    if (imageWidth > rectangleWidth) {
      tempHeight = imageHeight * rectangleWidth / imageWidth;
      if (tempHeight > rectangleHeight) {
        tempHeight = rectangleHeight;
        result = 2; // 压缩高度
      } else {
        tempWidth = rectangleWidth;
        tempHeight = imageHeight * rectangleWidth / imageWidth;
      }
    } else {
      if (imageHeight > rectangleHeight) {
        tempHeight = rectangleHeight;
        result = 2;
      } else {
        result = 3;
      }
    }
    float y = 0;
    if (result == 1) { // 压缩宽度
      y = rectangleHeight - tempHeight;
    } else if (result == 3) { // 不压缩
      y = rectangleHeight - imageHeight;
    }
    // y/=2; // 如果想要图片在表单域的上下对齐，这个值除以2就行。同理可以计算x的偏移
    if (result == 1) {
      canvas.addImage(image, rectangle.getX(), rectangle.getY() + y, tempWidth, false);
    } else if (result == 2) {
      canvas.addImage(image, rectangle.getX(), rectangle.getY(), tempHeight, false, false);
    } else if (result == 3) {
      canvas.addImage(image, rectangle.getX(), rectangle.getY() + y, false);
    }
  }
}
```

**✨✨✨若需要本文中的文件，请在公众号后台回复itext**

