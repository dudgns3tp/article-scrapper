import * as puppeteer from 'puppeteer';

// Velog
/**
 * 벨로그의경우 썸네일을 가져오는데 인터페이스에 맞게 가져오지 않는 경우가 있음 이럴경우 첫번째 이미지 겟?
 */
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    'https://velog.io/@server30sopt/postman-%ED%8F%AC%EC%8A%A4%ED%8A%B8%EB%A7%A8-team-workspace-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%9E%90%EB%8F%99-%EC%84%B8%ED%8C%85',
  );

  // 타이틀
  const titleSelector = await page.waitForSelector('.head-wrapper > h1');
  const title = await titleSelector?.evaluate((el) => el.textContent);

  //첫 번째 이미지
  const thumbnailSelector = await page.waitForSelector('img');
  const thumbnail = await thumbnailSelector?.evaluate((el) => el.src);

  const RowsOfArticle = await page.$$eval('p:not(blockquote p)', (elements) =>
    elements.map((el) => el.textContent),
  );

  const dateElement = await page.$('.information span:nth-child(3)');
  const createdAt = await dateElement.evaluate(
    (element) => element.textContent,
  );

  // Print the full title
  console.log('Title', title);
  console.log('thumbnail', thumbnail);
  console.log('createdAt', createdAt);
  console.log('articles', RowsOfArticle.join(' '));

  await browser.close();
})();

/**
 * 브런치
 */
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//
//   await page.goto('https://brunch.co.kr/@ny0303/42');
//
//   // 타이틀
//   const titleSelector = await page.waitForSelector('.cover_title');
//   const title = await titleSelector?.evaluate((el) => el.textContent);
//
//   // //첫 번째 이미지
//   const thumbnailSelector = await page.waitForSelector('.wrap_body_frame img');
//   const thumbnail = await thumbnailSelector?.evaluate((el) => el.src);
//
//   const RowsOfArticle = await page.$$eval('.wrap_body_frame span', (elements) =>
//     elements.map((el) => el.textContent),
//   );
//
//   const dateElement = await page.$('#wrapArticleInfo .date');
//   const createdAt = await dateElement.evaluate(
//     (element) => element.textContent,
//   );
//
//   // Print the full title
//   console.log('Title', title);
//   console.log('thumbnail', thumbnail);
//   console.log('createdAt', createdAt);
//   console.log('articles', RowsOfArticle.join(' '));
//
//   await browser.close();
// })();
