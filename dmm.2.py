from selenium import webdriver
import os
import time
import random
import sys
from pymongo import MongoClient
 
client = MongoClient('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang')
db = client.danang 

def listVideos(driver):
    # type: (webdriver) -> list(str)
  driver.save_screenshot("website1.png")
    
  
  expandBtn = driver.find_element_by_id("a_performer")
  expandBtn.click()
  time.sleep(2)
  driver.save_screenshot("website2.png")

  avList = driver.find_element_by_id('performer')

  avL = avList.find_elements_by_css_selector('a')

  
  for idx,elem in enumerate(avL,0):
      print('-', idx)
      print(elem.text)
      print(elem.get_attribute('href'))
  
  getImg = driver.find_element_by_id('mibd00388')

  print(getImg.get_attribute('href'))

  tables = driver.find_element_by_css_selector('table.mg-b20') 

  table = tables.find_elements_by_css_selector('tr')

  for idx,elem in enumerate(table,0):
      print('-', idx)
      td = elem.find_elements_by_css_selector('td')
      for ab in td:
          print(ab.text)
      

  caption = driver.find_elements_by_css_selector('div.mg-b20') 
  for idx,elem in enumerate(caption,0):
      print('-', idx)
      print(elem.text)
     

def getVideo(driver, videoLink):
    # type: (webdriver, str) -> None
    # driver.implicitly_wait(3)


    browser1 = webdriver.PhantomJS()
    browser1.implicitly_wait(1)
    

    browser1.get(videoLink)

    lis = browser1.find_elements_by_class_name('_ezgzd')
    try:
        title = lis[0].find_element_by_css_selector('span > span').text
    except:
        title = ''

    file_data = []
    mp4 =''
    try:
        tt = browser1.find_element_by_css_selector('video._l6uaz')
        mp4 = tt.get_attribute('src')

    except:
        try:
            while True:
                elems = browser1.find_elements_by_css_selector('img._2di5p')
                for idx,elem in enumerate(elems,0):
                    print('-',idx)
                    repath = elem.get_attribute('src')
                    file_data.append({"src":repath})
                    print('Downloading image %s...' % (repath))

                buttonR = browser1.find_element_by_class_name('coreSpriteRightChevron')
                # buttonR = browser1.find_element_by_css_selector("a._8kphn _by8kl coreSpriteRightChevron")
                print('is',buttonR.text)
                buttonR.click()
                browser1.implicitly_wait(1)
        except:
            print('none')
    
    db.he.le.n_.insert_one({'instaId' :inputText,'imgs':file_data, 'title': title,'mp4':mp4,'videoLink':videoLink})
    print('complete:'+videoLink)

    

    # buttonR.click()h
    

    

 
def checkVideoDurationSeconds():
    # type: () -> None
    
    for video in os.listdir(os.curdir):
        if not video.endswith("mp4"):
            continue
        print (video)
        os.system('ffprobe -i {} -show_entries format=duration -v quiet -of csv="p=0"'.format(os.path.join(os.curdir, video)))
 
 
def main():
    print('-',os.curdir)
    #sourceLink = 'https://www.instagram.com/he.le.n_/'
    #sourceLink = 'https://www.instagram.com/j.caeyul/'
    sourceLink = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=mibd388/?i3_ref=list&i3_ord=120'
    driver = webdriver.PhantomJS()
    driver.implicitly_wait(1)
    driver.get(sourceLink)
    videoLinks = listVideos(driver)
    # print ('get {} number of videos'.format(len(videoLinks)))
    # for videoLink in videoLinks:
    #     print ('download', videoLink)
    #     getVideo(driver, videoLink)
    #     time.sleep(random.randint(3, 10))
    # driver.close()
    # checkVideoDurationSeconds()
    
 
if __name__ == "__main__":
    main()