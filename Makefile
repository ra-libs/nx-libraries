create-react-lib:
	npx nx g @nx/react:library ${NAME} --publishable --importPath @ra-libs/${NAME}

create-nestjs-lib:
	npx nx g @nx/nest:library ${NAME} --publishable --importPath @ra-libs/${NAME}

setup-lib:
	npx nx g @theunderscorer/nx-semantic-release:setup-project ${NAME}


lint:
	npx nx format:write
	npx nx affected -t lint --fix

build:
	npx nx run-many -t build --all

yalc-publish:
	nx run-many -t build
	cd dist/packages/react && yalc publish
	cd dist/packages/react-rbac && yalc publish

update:
	nx migrate latest
	nx migrate --run-migrations
	rm migrations.json