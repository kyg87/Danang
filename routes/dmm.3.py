from selenium import webdriver
import os
import time
import random
import sys
from pymongo import MongoClient
import warnings

client = MongoClient('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang')
db = client.danang 

param = sys.argv[1]

warnings.filterwarnings('ignore')

sourceLink = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid='+ param +'/'
#print(sourceLink)
driver = webdriver.PhantomJS()
driver.implicitly_wait(1)
driver.get(sourceLink)

driver.save_screenshot("website1.png")

avNames = []

try:
    expandBtn = driver.find_element_by_id("a_performer")

    expandBtn.click()
    time.sleep(2)
    driver.save_screenshot("website2.png")

    avList = driver.find_element_by_id('performer')


    avL = avList.find_elements_by_css_selector('a')


    for idx,elem in enumerate(avL,0):
        # print('-', idx)
        # print('name',elem.text)
        # print(elem.get_attribute('href'))
        avNames.append({'name': elem.text , 'href' :elem.get_attribute('href')})
    # driver.close()    
    # print({'avList': avNames})
except :
    try:
        avList = driver.find_element_by_id('performer')


        avL = avList.find_elements_by_css_selector('a')


        for idx,elem in enumerate(avL,0):
            # print('-', idx)
            # print('name',elem.text)
            # print(elem.get_attribute('href'))
            avNames.append({'cid':param,'name': elem.text , 'href' :elem.get_attribute('href')})
        # driver.close()    
        # print({'avList': avNames})
    except :
        avNames = []

# expandBtn = driver.find_element_by_id("a_performer")

# expandBtn.click()
# time.sleep(2)
# driver.save_screenshot("website2.png")

# avList = driver.find_element_by_id('performer')


# avL = avList.find_elements_by_css_selector('a')

# avNames = []

# for idx,elem in enumerate(avL,0):
#     # print('-', idx)
#     # print('name',elem.text)
#     # print(elem.get_attribute('href'))
#     avNames.append({'name': elem.text , 'href' :elem.get_attribute('href')})
# driver.close()    
# print({'avList': avNames})
# print(sys.argv[1])

getImg = driver.find_element_by_id(param).get_attribute('href')


# print(getImg.get_attribute('href'))

tables = driver.find_element_by_css_selector('table.mg-b20') 

table = tables.find_elements_by_css_selector('tr')

for idx,elem in enumerate(table,0):
    # print('-', idx)
    td = elem.find_elements_by_css_selector('td')
    # for ab in td:
        # print(ab.text)
    

caption = driver.find_elements_by_css_selector('div.mg-b20') 

content =''
for idx,elem in enumerate(caption,0):
    # print('-', idx)
    # print(elem.text)
    if(idx == 1):
        content = elem.text

# print({"avList":avNames ,"content" : content, "img" : getImg})
db.avNumber.insert_one({'avList':avNames ,'content' : content, 'img' : getImg})
