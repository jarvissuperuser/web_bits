### This file sends the the project folder to the html localhost folder

from os.path import isdir, exists
from os import makedirs,mkdir, getcwd, system
def chkdir(dirloc):
	ex = False
	if (isdir(dirloc)):
		ex = True
	return  ex

def ctd(varn):
	dl = '/var/www/html/' + varn
	return chkdir(dl)

def gprj():
	wd = getcwd()
	dc = False
	fn = wd.split('/')
	fn.reverse()
	if (ctd(fn[0])):
		system('cp -a ./* /var/www/html/'+fn[0])
		system('chown -R www-data:www-data /var/www/html/'+fn[0])
	else:
		mkdir('/var/www/html/'+fn[0])
		system('cp -a ./* /var/www/html/'+fn[0])
		system('chown -R www-data:www-data /var/www/html/'+fn[0])
	return 'Copied' 

print str(ctd('dm'))
print gprj()
