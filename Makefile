setup:
	powershell start ./install/node-v16.17.0-x64.msi
	rmdir /s /q install

clean: 
	rmdir /s /q dist