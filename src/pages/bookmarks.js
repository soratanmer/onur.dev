import { useState } from 'react'
import { NextSeo } from 'next-seo'
import tinytime from 'tinytime'

// --- Components
import Card from 'components/Card'
import Layout from 'components/Layout'
import PageHeading from 'components/PageHeading'

// --- Others
import { raindropCollections } from 'lib/constants'
import getBookmarks from 'lib/raindrop'
import { ogImageUrl } from 'lib/helper'

const url = 'https://onur.dev/bookmarks'
const title = 'Bookmarks — Onur Şuyalçınkaya'

const Bookmarks = ({ readings, personalSites, UIs }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
          images: [
            {
              url: ogImageUrl('**Bookmarks**'),
              alt: title
            }
          ]
        }}
      />
      <Layout>
        <PageHeading
          heading="Bookmarks"
          description="Personal sites, articles, blog posts, and some useful UI materials. Hoping to grow it in the time to come. I'll be also using here for remembering things."
        />
        <>
          <label htmlFor="category" class="block text-sm font-medium">
            Category
          </label>
          <div className="relative w-full mt-1.5">
            <select
              id="category"
              name="category"
              className="flex justify-center w-full appearance-none rounded-md border border-gray-300 shadow-normal px-4 py-2 bg-white font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer"
              onChange={({ target }) => {
                const selectedIndex = target.options.selectedIndex
                if (activeIndex !== selectedIndex) setActiveIndex(selectedIndex)
              }}
            >
              {Object.values(raindropCollections).map((item, itemIndex) => (
                <option key={`option_${itemIndex}`} data-id={itemIndex} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <div className="mt-6 w-full">
            {activeIndex === 0 && (
              <div className="space-y-6 divide divide-y-2">
                {personalSites.map((personalSite, personalSiteIndex) => (
                  <div key={`personalSite_${personalSiteIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={personalSite.domain}
                      primaryText={
                        <time dateTime={personalSite.created}>
                          {tinytime('{MM} {DD}, {YYYY}').render(new Date(personalSite.created))}
                        </time>
                      }
                      url={personalSite.link}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeIndex === 1 && (
              <div className="space-y-6 divide divide-y-2">
                {readings.map((readingItem, readingItemIndex) => (
                  <div key={`readingItem_${readingItemIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={readingItem.title}
                      primaryText={
                        <time dateTime={readingItem.created}>
                          {tinytime('{MM} {DD}, {YYYY}').render(new Date(readingItem.created))}
                        </time>
                      }
                      secondaryText={readingItem.domain}
                      url={readingItem.link}
                    />
                  </div>
                ))}
              </div>
            )}
            {activeIndex === 2 && (
              <div className="space-y-6 divide divide-y-2">
                {UIs.map((item, itemIndex) => (
                  <div key={`ui_${itemIndex}`} className="first:pt-0 pt-6">
                    <Card
                      title={item.title}
                      primaryText={
                        <time dateTime={item.created}>
                          {tinytime('{MM} {DD}, {YYYY}').render(new Date(item.created))}
                        </time>
                      }
                      secondaryText={item.excerpt}
                      url={item.link}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* {Object.values(raindropCollections).map((item, itemIndex) => (
            <Fragment key={`collection_${itemIndex}`}>
              <input type="radio" name="tabs" id={`tab-${itemIndex}`} defaultChecked={itemIndex === 0 && 'checked'} />
              <label
                htmlFor={`tab-${itemIndex}`}
                className="flex-1 py-2 px-4 min-w-max font-semibold text-center text-gray-600 border-b-2 outline-none focus:outline-none hover:text-primary-default transition-colors duration-200 order-1 cursor-pointer"
              >
                {item}
              </label>
              <div className="tab flex-grow order-2 w-full hidden bg-white">
                {itemIndex === 0 && (
                  <div className="space-y-6 mt-6 divide divide-y-2">
                    {personalSites.map((personalSite, personalSiteIndex) => (
                      <div key={`personalSite_${personalSiteIndex}`} className="first:pt-0 pt-6">
                        <Card
                          title={personalSite.domain}
                          primaryText={
                            <time dateTime={personalSite.created}>
                              {tinytime('{MM} {DD}, {YYYY}').render(new Date(personalSite.created))}
                            </time>
                          }
                          url={personalSite.link}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {itemIndex === 1 && (
                  <div className="space-y-6 mt-6 divide divide-y-2">
                    {readings.map((readingItem, readingItemIndex) => (
                      <div key={`readingItem_${readingItemIndex}`} className="first:pt-0 pt-6">
                        <Card
                          title={readingItem.title}
                          primaryText={
                            <time dateTime={readingItem.created}>
                              {tinytime('{MM} {DD}, {YYYY}').render(new Date(readingItem.created))}
                            </time>
                          }
                          secondaryText={readingItem.domain}
                          url={readingItem.link}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {itemIndex === 2 && (
                  <div className="space-y-6 mt-6 divide divide-y-2">
                    {UIs.map((item, itemIndex) => (
                      <div key={`ui_${itemIndex}`} className="first:pt-0 pt-6">
                        <Card
                          title={item.title}
                          primaryText={
                            <time dateTime={item.created}>
                              {tinytime('{MM} {DD}, {YYYY}').render(new Date(item.created))}
                            </time>
                          }
                          secondaryText={item.excerpt}
                          url={item.link}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Fragment>
          ))} */}
        </>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const data = await getBookmarks()

  /* const dataGroupByDay = groupBy(data, (item) => {
    return format(parseISO(item.created), 'd MMMM yyyy', { locale: tr })
  }) */

  const personalSites = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[0]))
  const readings = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[1]))
  const UIs = data.items.filter((item) => item.collectionId === Number(Object.keys(raindropCollections)[2]))

  /* const all = [...readingItems, ...personalSitesItems, ...uiItems].sort(
    (a, b) => Number(new Date(b.created)) - Number(new Date(a.created))
  ) */

  return {
    props: {
      // all,
      readings,
      personalSites,
      UIs
    },
    revalidate: 600
  }
}

export default Bookmarks