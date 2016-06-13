#/bin/bash
# 输出目录
OUTPUT_PATH='./output'
[ -d $OUTPUT_PATH ] || mkdir $OUTPUT_PATH
rm -rf $OUTPUT_PATH/*

env NODE_ENV=production webpack -p

# 移动
mv ./asset $OUTPUT_PATH
cp -r ./dep $OUTPUT_PATH
cp index.tpl $OUTPUT_PATH/index.tpl
cp login.tpl $OUTPUT_PATH/login.tpl
echo 'build done'
